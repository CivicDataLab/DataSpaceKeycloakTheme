# CivicDataLab Keycloak Theme

[![Deployment](https://github.com/CivicDataLab/DataSpaceKeycloakTheme/actions/workflows/deploy-keycloak-staging.yml/badge.svg?branch=main)](https://github.com/CivicDataLab/DataSpaceKeycloakTheme/actions/workflows/deploy-keycloak-staging.yml)
[![CI](https://github.com/CivicDataLab/DataSpaceKeycloakTheme/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/CivicDataLab/DataSpaceKeycloakTheme/actions/workflows/ci.yaml)
[![Keycloak](https://img.shields.io/badge/Keycloak-26.7.0-blue)](https://www.keycloak.org/)
[![Keycloakify](https://img.shields.io/badge/Keycloakify-v11-blue)](https://keycloakify.dev)

The login, registration and account pages for
[**auth.civicdatalab.in**](https://auth.civicdatalab.in) — the identity provider
every CivicDataLab product authenticates through.

Built with [Keycloakify](https://keycloakify.dev) v11 on Keycloak 26.7.0.

---

## ⚠️ This deploys to production

`auth.civicdatalab.in` is **production**. It serves authentication for:

| Product | Environments |
|---|---|
| CivicDataSpace | dev + prod |
| ParakhAI | dev + prod |
| Analytics (Superset) | dev + prod |
| DataSpace behind IDS-DRR | dev + prod |

A broken deploy here **signs every user out of every product**. Treat changes
accordingly.

**Merging to `main` deploys immediately.** Work lands on `dev` first; pushing to
`dev` deploys nothing.

## How a change reaches users

```
PR ──► dev ──────────────────────────────► (no deploy)
        │
        └─ reviewed, merged to main
                 │
                 ▼
        Build image ──► push to GHCR (digest-pinned)
                 │
                 ▼
        Deploy ──► pg_dump backup taken first
                 │
                 ├─ health gate: /health/ready
                 │     └─ unhealthy ──► automatic rollback to the previous image
                 ▼
        Keycloak tests (CivicDataSpace-test)
              login page · Google sign-in · privacy links · issuer
```

The tests run from
[`CivicDataSpace-test`](https://github.com/CivicDataLab/CivicDataSpace-test)
after every deploy, because the theme ships independently of the applications —
a theme change can break sign-in while every product's own pipeline stays green.

### The rollback is not a complete safety net

A Keycloak **major** upgrade migrates the database schema via Liquibase, and that
is one-way. Rolling the image back does **not** undo it, and the older image
cannot start against the new schema. Every deploy takes a `pg_dump` first for
exactly this reason; restore it before retrying an older image.

## Local development

```bash
git clone https://github.com/CivicDataLab/DataSpaceKeycloakTheme
cd DataSpaceKeycloakTheme
npm install
npm run storybook          # every page, no Keycloak needed
```

Storybook is the fastest loop: each page has a story, including error and
validation states that are awkward to reproduce against a live server.

To test against a real Keycloak, see the
[Keycloakify testing guide](https://docs.keycloakify.dev/testing-your-theme).

### Building the theme jar

Requires Maven ≥ 3.1.1 and a JDK on `$PATH`.

```bash
npm run build-keycloak-theme
```

Keycloakify emits **one jar per Keycloak version range**. This deployment uses
`keycloak-theme-for-kc-all-other-versions.jar` — the one for Keycloak 26+. The
other jar, `keycloak-theme-for-kc-22-to-25.jar`, bundles a password-policy
extension that 22–25 needed and 26 provides natively. Copying both into
`providers/` lets Keycloak pick a theme you did not intend.

## Customising

- [Customization strategies](https://docs.keycloakify.dev/customization-strategies)
- `npx keycloakify initialize-account-theme` — account pages
- `npx keycloakify initialize-email-theme` — email templates

## Names that must not be changed

Several identifiers still say "staging" for historical reasons. They are
cosmetic, and renaming any of them causes an outage:

| Identifier | Renaming it |
|---|---|
| `CONTAINER_NAME` (`keycloak-staging`, `keycloak-staging-db`) | compose creates a **second** container and orphans the running one |
| volume `kc_postgres_data` | Keycloak gets an **empty database** — every realm, client and user lost |
| `DEPLOY_PATH` | the deploy targets a directory that does not exist |

Each site carries a comment in the workflow saying so. Please leave them.

## Configuration and secrets

No credentials live in this repository, and none ever have. Runtime
configuration is an environment file on the deployment host; deploy credentials
are GitHub **environment** secrets on `keycloak-production`. The compose file
references variables such as `${KEYCLOAK_PASSWORD}` and never their values.

Note that `${KC_BOOTSTRAP_ADMIN_*}` are the Keycloak 26 variable names. On
Keycloak 24 they were silently ignored — `kc.sh show-config` echoed them back,
which is what made them look like they worked.

## Reporting a security issue

See [SECURITY.md](SECURITY.md). Please do not open a public issue for a
vulnerability in an authentication surface.

## Licence

See [LICENSE](LICENSE).
