# Prototype: [Name] — [YYYY-MM-DD]

> Copy this file, rename it `prototype-YYYY-MM-DD-[name].md`, and fill it in.
> Write it while you build, not after. It is what an engineer (or their agent)
> reads to understand what you made without asking you. Delete this quote block
> when you start.

## What it's for

- **The question it answers:** [What you are trying to learn or show]
- **Who it's for:** [The user — link the PRD or research if there is one]
- **Where to look:** [Routes or screens, e.g. `/checkout`, `/checkout/done`]

## Real or faked?

The most valuable section. A prototype that looks finished hides what isn't.

| Part | Real, faked, or not built | Notes |
| --- | --- | --- |
| [e.g. Sign-in] | Faked | [Any email works; no account is created] |
| [e.g. Price list] | Real | [Reads from `data/prices.ts`] |
| [e.g. Error states] | Not built | [Only the happy path exists] |

## Decisions made

| Decision | Why | Who agreed |
| --- | --- | --- |
| | | |

## Still open

Questions that need an answer before this is built for real.

- [ ] [e.g. What happens when payment fails?]

## For the engineer

- **Components used:** [Which ones come from `components/ui` and which are new]
- **Needs a production decision:** [Data, auth, performance, anything faked above]
- **Don't copy as-is:** [Shortcuts taken to move fast]

---

**Watch out for:** "it works in the prototype" is not "it's decided". If a
behaviour was a guess, put it in **Still open**, not **Decisions made**.
