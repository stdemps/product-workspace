# Production hardening checklist

Use this checklist when moving from development to production.

## Security

- [ ] **Secrets:** All secrets (auth, DB, API keys) come from environment variables or a secret manager; none are committed or in repo.
- [ ] **Auth:** Session cookies use `Secure`, `HttpOnly`, and appropriate `SameSite`. CSRF protection is enabled for state-changing requests.
- [ ] **Input validation:** All API routes and server actions validate input with a schema (e.g. Zod) before use.
- [ ] **Error handling:** Production responses do not expose stack traces or internal error details; errors are logged server-side only.
- [ ] **Security headers:** Consider adding headers (e.g. CSP, HSTS, X-Frame-Options, X-Content-Type-Options) via `next.config.js` or middleware. See [Next.js security headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers).

## HTTPS and TLS

- [ ] **HTTPS only:** App is served over HTTPS in production (handled by Vercel/similar by default).
- [ ] **Redirect HTTP → HTTPS:** Ensured by hosting provider or reverse proxy.

## CI/CD and quality

- [ ] **CI:** Lint, type-check, and tests run on every push/PR (see `docs/examples/github-actions-ci.yml`).
- [ ] **SAST:** Optional but recommended: run Semgrep or similar in CI (see `docs/examples/github-actions-sast.yml`).
- [ ] **Dependencies:** `npm audit` is run (e.g. in CI or before release); high/critical issues are addressed or accepted with documentation.

## Monitoring and operations

- [ ] **Logging:** Sensitive data (passwords, tokens, PII) is not logged in plain text.
- [ ] **Monitoring:** Errors and critical flows are monitored (e.g. logging, error tracking, alerts).

## Compliance and policy

- [ ] **Data handling:** If you process PII or regulated data, ensure retention, encryption, and access controls match your policy and applicable regulations.
- [ ] **Security policy:** Consider adding a `SECURITY.md` (or linking to it) so users know how to report vulnerabilities. This template includes a root `SECURITY.md` you can adapt.
