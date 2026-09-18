# Current Work

> Read this first at the start of every session. Keep it up to date as you go.

---

## Active Feature

<!-- What are you building right now? Link to a PRD or plan if you have one. -->

## Active Branch

<!-- Which git branch is this work on? e.g. `feature/user-auth` -->

## What's Been Built

<!-- List completed items as you go. This becomes your changelog. -->
<!-- - Item 1 -->
<!-- - Item 2 -->

## Known Remaining Work

<!-- What's left to do? -->
<!-- - [ ] Task 1 -->
<!-- - [ ] Task 2 -->

## Quick Reference

<!-- Add useful commands and links as your project grows. -->
- Run dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Test: `npm test`
- Enable pre-commit checks (once per clone): `git config core.hooksPath .githooks`

---

## Example — what a good session note looks like

Delete this section once you have written your own. It is here to show the shape.

At the end of a piece of work, add a dated note to **What's Been Built**. Say what
changed, why it was broken, and what you ran to prove it works. The last part is
the one people skip, and it is the one that saves you later.

> ### 2026-09-18 — Sign-up form accepted a blank email
>
> **What changed.** The sign-up form now blocks submission until the email field
> contains a valid address, and shows the reason underneath the field.
>
> **Why it was broken.** The form checked that the field had been touched, not that
> it had a value. Tabbing through the field and straight to Submit passed the check.
>
> **Verified.**
> - `npm run typecheck` — passed, 0 errors
> - `npm run build` — passed
> - `npm test` — 12/12 passed
> - Opened `/signup` and confirmed the message appears and Submit stays disabled
>
> **Left to do.** Password rules still allow 4 characters. Raised as a separate task.
