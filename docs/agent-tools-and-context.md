# Agent Tools and Context

Recommended tools and context to give each agent (in Cursor or when using Claude Code skills) so they can do their best work.

## Overview

| Agent / Skill | Best with | Why |
|---------------|-----------|-----|
| **Engineer** | File read, terminal, **Playwright MCP** | Read code/PRDs; run commands; drive browser to verify UI or debug. |
| **Designer** | File read, **Playwright MCP** | Read PRDs/specs; open app and take snapshots to review layout, responsiveness, a11y. |
| **PM** | File read | Read PRDs, templates, clarification sessions. |
| **User Researcher** | File read | Read PRDs, research docs, templates. |
| **Executive** | File read | Read PRDs, strategy docs. |
| **Engineer Review** | Read target file + `docs/prds/template-prd.md` | Compare doc to template; full context for technical review. |
| **Designer Review** | Read target file + template | Same; UX review benefits from structure reference. |
| **PRD Review** | Read target file + template | Multi-perspective review needs doc + structure. |
| **Designer PRD→UX** | Read PRD + `docs/prds/template-prd.md`; **write** UX spec | Validate PRD structure; output `{basename}-ux-spec.md`. |
| **UX→Implementation Plan** | Read UX spec; **write** implementation plan | Input UX spec; output `{basename}-implementation-plan.md`. |
| **PM Clarify PRD** | Read PRD; **write** clarification session; **AskUserQuestion** | Clarify in depth; persist Q&A; use tool for user choices. |
| **Brand Identity** | Read `skills/brand-identity/resources/*` | Needs design tokens, tech stack, voice/tone before generating. |

---

## In Cursor

### Giving context

- **@-mention files:** e.g. `@docs/prds/my-feature.md` or `@app/page.tsx` so the agent has the exact doc/code in context.
- **@-mention the agent:** e.g. `@engineer` then ask your question; add file @-mentions in the same message when doing reviews.
- **Playwright MCP:** If enabled (see [SETUP.md](../SETUP.md#6-enable-playwright-mcp-optional)), the AI can use the browser (navigate, snapshot, click, type) when you ask to “check the app” or “verify the UI.” Especially useful with `@engineer` or `@designer`.

### Tools agents use automatically

When you @-mention a file, Cursor gives the model that content. The model can also:

- **Read files** — to load PRDs, specs, code, templates.
- **Edit files** — for skills that produce artifacts (UX spec, implementation plan, clarification session).
- **Run terminal commands** — e.g. run dev server, tests, or lint (Engineer).
- **Use Playwright MCP** — if enabled, to open the app, take snapshots, and interact with the UI (Engineer, Designer).

### Recommended flow for reviews

1. You: “@engineer-review @docs/prds/api-dashboard.md — review this PRD.”
2. Or: “@engineer Review the PRD at docs/prds/api-dashboard.md and compare structure to docs/prds/template-prd.md.”

For **Designer** or **Engineer** UI feedback:

1. Start dev server (`npm run dev`).
2. You: “@designer The new dashboard is at http://localhost:3000/dashboard — open it with the browser and give UX feedback on the layout and accessibility.”

---

## Playwright MCP

- **What:** Browser automation (navigate, snapshot, click, type, etc.) so the AI can see and interact with your app.
- **Setup:** [SETUP.md#6 – Enable Playwright MCP](../SETUP.md#6-enable-playwright-mcp-optional). Config: `.cursor/mcp.json`.
- **Who benefits:** **Engineer** (verify behavior, debug UI), **Designer** (review layout, responsiveness, flows without you pasting screenshots).

---

## Claude Code (CLI) skills

Review skills (`/engineer-review`, `/designer-review`, `/prd-review`) take a file path and inject that file’s content into the prompt; no extra tool config. For **PM Clarify**, the runner expects the **AskUserQuestion** tool to be available so the agent can offer choices (depth, etc.). When running skills that produce files (PRD→UX, UX→implementation plan, clarify session), the agent needs **write** access to the repo so it can create the output files.

---

## Quick reference: what to @ in Cursor

| Task | @ Agent | @ Files / context |
|------|---------|-------------------|
| Technical review of a PRD | @engineer | `docs/prds/my-feature.md`, optionally `docs/prds/template-prd.md` |
| UX review of a PRD | @designer | same |
| Full PRD review (all perspectives) | @engineer @designer @pm (or use `/prd-review` with path) | PRD + template |
| “Check the live UI” | @engineer or @designer | (none; ask to use browser if Playwright MCP enabled) |
| Turn PRD into UX spec | @designer-prd-to-ux | PRD + template |
| Turn UX spec into implementation plan | @ux-to-implementation-plan | UX spec file |
| Clarify a PRD | @pm-clarify-prd | PRD |
| Brand/theme/copy | @brand-identity | (optional) `skills/brand-identity/resources/*` if not already in context |
