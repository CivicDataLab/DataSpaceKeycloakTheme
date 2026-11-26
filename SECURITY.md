# Security Policy

This repository contains the Keycloakify theme for CivicDataLab's identity
provider. Because it renders the login, registration and account pages that
every CivicDataLab product authenticates through, security reports here are
treated with priority.

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report privately, whichever is easier:

- **GitHub** — the *Security* tab → *Report a vulnerability* (private advisory).
  Preferred, because the discussion stays attached to this repository.
- **Email** — [info@civicdatalab.in](mailto:info@civicdatalab.in) with
  `SECURITY` in the subject line.

Helpful to include, though a partial report is far better than none:

- what an attacker could achieve, not only what is technically wrong
- the steps to reproduce it, and the affected page or endpoint
- the browser and version, if the issue is a rendering or client-side one
- whether you believe it is already being exploited

We aim to acknowledge within **five working days**. CivicDataLab is a small
team, so please allow reasonable time for a fix before disclosing publicly. We
are glad to credit reporters in the advisory unless you prefer otherwise.

## Scope

**In scope** — anything in this repository: the theme's page templates,
components and build configuration, and the deployment workflow under
`.github/workflows/`.

**Out of scope, but still worth telling us about** — issues in the products
that use this theme, or in the identity provider's own configuration. Those are
not fixed by changes here, but the same contacts will route them.

**Not in scope** — findings against Keycloak or Keycloakify themselves. Report
those upstream:

- Keycloak: https://github.com/keycloak/keycloak/security
- Keycloakify: https://github.com/keycloakify/keycloakify

## A note on what is in this repository

There are no credentials here, and there never have been. Runtime configuration
lives in an environment file on the deployment host and in GitHub environment
secrets; the compose file references variables such as `${KEYCLOAK_PASSWORD}`
and never their values. The history was scanned across all 634 commits before
this repository was made public.

If you do find committed key material, that is itself the vulnerability and we
would like to know urgently.

## What a report will not be penalised for

Reports made in good faith are welcome even if they turn out to be a false
positive or already known. We would rather read a duplicate than miss a real
issue because someone hesitated.
