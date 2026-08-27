# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 - build the Keycloakify theme jar.
# Keycloakify needs Node, a JDK and Maven >= 3.1.1 all on $PATH.
# ---------------------------------------------------------------------------
FROM node:20-bookworm AS theme-build

RUN apt-get update \
    && apt-get install -y --no-install-recommends openjdk-17-jdk-headless maven \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# --ignore-scripts because the `postinstall` (keycloakify sync-extensions) reads
# src/, which is not copied yet. Deps land in their own cached layer this way, so
# a source-only change does not reinstall them.
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npx keycloakify sync-extensions
RUN npm run build-keycloak-theme

# Keycloakify emits one jar per Keycloak version range. Keycloak 24 needs
# `keycloak-theme-for-kc-all-other-versions.jar` specifically -- copying them
# all into providers/ lets Keycloak pick a theme we did not intend.
RUN set -eux; \
    ls -l dist_keycloak; \
    test -f dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar; \
    sha256sum dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar \
        | cut -d' ' -f1 > /tmp/theme-jar-sha256; \
    cat /tmp/theme-jar-sha256

# ---------------------------------------------------------------------------
# Stage 2 - bake the theme into the Keycloak image.
# ---------------------------------------------------------------------------
FROM quay.io/keycloak/keycloak:24.0.0

COPY --from=theme-build \
    /app/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar \
    /opt/keycloak/providers/

# These four are *build-time* options in Keycloak 24. Setting them only in
# compose `environment:` (as the staging box does today) forces a re-augmentation
# on every start. They must match what compose passes at runtime, or the server
# re-augments and the ~16s cost comes straight back.
ENV KC_DB=postgres \
    KC_HEALTH_ENABLED=true \
    KC_METRICS_ENABLED=true \
    KC_HTTP_RELATIVE_PATH=/auth

# Providers are registered at build time. Without this the augmentation runs on
# every container start (the ~16s "Quarkus augmentation completed" in the logs)
# and a jar dropped into providers/ on a running server does nothing at all.
RUN /opt/keycloak/bin/kc.sh build

ARG GIT_COMMIT_SHA=unknown
ARG THEME_JAR_SHA256=unknown

# So that "which theme is this box running, and from which commit" is answered
# by one `docker inspect` rather than by comparing sha256 sums across servers.
LABEL org.opencontainers.image.revision="${GIT_COMMIT_SHA}" \
      org.opencontainers.image.source="https://github.com/CivicDataLab/DataSpaceKeycloakTheme" \
      in.civicdatalab.theme.jar.sha256="${THEME_JAR_SHA256}"
