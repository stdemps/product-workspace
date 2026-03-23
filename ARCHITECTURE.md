# Architecture

High-level architecture and data flows. Update this as the project grows.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Forms:** react-hook-form + Zod
<!-- Add more as you integrate them (database, auth, etc.) -->

## Routes

| Route | Description | Auth required? |
|---|---|---|
| `/` | Home page | No |
| `/contact` | Contact form example | No |
<!-- Add routes as you create them -->

## Data Sources

<!-- Describe where your data comes from and how it flows -->
<!-- - **Database:** e.g. Neon Postgres via Prisma -->
<!-- - **Auth:** e.g. Clerk, NextAuth -->
<!-- - **External APIs:** e.g. Stripe, Resend -->

## Key Components

<!-- List the most important components and their purpose -->
<!-- - `components/empty-state.tsx` — Reusable empty state (icon + title + description + CTA) -->
<!-- - `components/topbar.tsx` — Navigation bar -->

## Hooks

<!-- List custom hooks and what they do -->
<!-- - `hooks/use-mobile.tsx` — `useIsMobile()` (< 640px) and `useIsCompact()` (< 1024px) for responsive behaviour -->

## State Management

<!-- How does data flow through the app? -->
<!-- - React hooks (useState, useEffect) for local state -->
<!-- - Server Components for server-side data -->
<!-- - react-hook-form for form state -->

## Testing

<!-- What testing is set up and how to run it -->
- Lint: `npm run lint`
- Build: `npm run build`
<!-- - E2E: `npm test` (Playwright) — product-workspace only -->

## Performance

<!-- Note any performance patterns as you add them -->
<!-- - Lazy loading for heavy components -->
<!-- - Image optimization via next/image -->

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout with providers |
| `app/globals.css` | CSS custom properties (design tokens) |
| `tailwind.config.ts` | Theme configuration |
| `components.json` | shadcn/ui config |
| `DESIGN_SYSTEM.md` | Visual design rules and conventions |
| `CURRENT-WORK.md` | Active feature tracking |
