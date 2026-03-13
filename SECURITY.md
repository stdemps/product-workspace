# Security

This document covers recommended security practices for projects built from this template.

## Secrets and environment variables

- **Never commit real secrets.** Use `.env.local` for local development and keep it out of version control (it is listed in `.gitignore`).
- **Production and CI:** Use your platform’s secret manager or CI/CD environment variables for `NEXTAUTH_SECRET`, `DATABASE_URL`, API keys, etc. Do not put production secrets in repo or in `.env` files that are committed.
- Copy `.env.example` to `.env.local` and fill in only the values you need. Remove or leave commented any variables you don’t use.

## Authentication and sessions

This template does not include an auth implementation. When you add one:

- **Recommended stack:** [NextAuth.js](https://next-auth.js.org/) (or your provider’s official SDK) with the App Router, using secure defaults.
- **Session cookies:** Prefer `Secure`, `HttpOnly`, and `SameSite=Lax` (or `Strict`). NextAuth.js sets these by default when configured correctly.
- **CSRF:** Use built-in CSRF protection (e.g. NextAuth.js CSRF tokens) for any mutation endpoints that rely on session cookies.
- **Secrets:** Store `NEXTAUTH_SECRET` in environment variables only; generate a strong random value (e.g. `openssl rand -base64 32`).

## Input validation

- **Validate all user input** on the server, including request bodies, query params, and headers.
- This repo uses **Zod** for schemas. Use the same pattern as `app/api/contact/route.ts`:
  - Define a Zod schema.
  - Use `schema.safeParse()` (or `parse()` with try/catch) before using input.
  - Return 400 with sanitized error messages; avoid leaking internal details in 500 responses.
- Validate length, type, and format; reject invalid data early.

## API and error handling

- **Structured responses:** Return JSON with a consistent shape (e.g. `{ success, error?, data? }`). See the contact API route for an example.
- **Errors:** Do not expose stack traces or internal errors to the client. Log them server-side only.
- **Rate limiting:** For public or sensitive endpoints (auth, contact, webhooks), add rate limiting (e.g. Vercel, Upstash, or your hosting provider).

## Security tooling and CI

- **Lint and type-check:** The template recommends running `npm run lint` and `npx tsc --noEmit` in CI (see `docs/examples/github-actions-ci.yml`).
- **SAST:** Use static analysis (e.g. Semgrep, CodeQL) in CI. Example workflow: `docs/examples/github-actions-sast.yml`. Cursor/Claude rules in `.cursor/rules/` (e.g. `security-sast.mdc`, `security-hardening.mdc`) describe how to integrate and tune these tools.
- **Dependencies:** Run `npm audit` regularly and fix high/critical issues. Consider enabling Dependabot or similar for dependency updates.

## Reporting vulnerabilities

If you discover a security issue in this template or in a project derived from it, please report it privately (e.g. via maintainer contact or security policy) rather than in a public issue.
