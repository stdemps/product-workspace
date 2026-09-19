---
name: preflight
description: Pre-PR pre-flight check that reviews the current branch's changes across three lenses — code quality / developer standards, accessibility (WCAG), and design-system conformance — then produces one prioritised report and offers to fix what you approve. Use before raising a pull request, when the user says "preflight", "pre-flight check", "is this ready for a PR", "check before I raise the PR", "review my branch before I push", "sanity check this branch", or wants a final quality gate before shipping a change. Especially useful for non-engineers who want confidence the code is up to standard, accessible, and on-pattern before opening a PR.
user-invocable: true
argument-hint: "(optional) feature area or note about what changed"
---

# Pre-flight check (before raising a PR)

Run three reviews over the changes on the current branch, fold them into one prioritised report, then offer to fix what the user approves. Nothing in the working tree changes until the user picks fixes at the gate.

This is a **review-and-offer gate**, not a deploy step. It does not run tests, create the PR, push, or touch anything outside the branch's changes.

The person running this is often a designer or non-engineer who can't easily judge code themselves — so the report must explain *why* each finding matters in plain language, not just name the rule. Confidence is the product here.

## Step 0 — Scope the diff

Establish exactly what's under review before reviewing anything.

1. Confirm you're in a git repo. If not, stop and tell the user — there's nothing to pre-flight.
2. Find the base branch the work diverged from. Try in order:
   - the branch's upstream/tracking ref,
   - `main` then `master` then `develop` if they exist,
   - the user's stated base if they gave one.
3. Compute the changed files: `git diff --name-only <base>...HEAD` plus uncommitted changes (`git status --porcelain`). Use the merge-base (`...`) so you review only this branch's work, not unrelated commits on the base.
4. If there are no changes vs the base, say so and stop.
5. Show the user the list of files in scope and the base you picked, then proceed. If the base looks wrong (e.g. hundreds of unrelated files), say so — a mis-detected base makes the whole report noise.

Review the **full content of each changed file**, not just the changed lines — a few lines added to a component can break patterns or accessibility for the whole file. But keep the *scope* to files this branch touched; don't wander into the rest of the repo except to learn the project's own standards (see the design-system check).

## Step 1 — Run the three checks

These three lenses are independent, so dispatch them as parallel subagents (one each) and collect their findings. If subagents aren't available, run them in sequence. Give each subagent the list of in-scope files and the instructions for its lens below, and ask it to return findings in the shared finding format (see Step 2).

If the [a11y-audit](../a11y-audit/SKILL.md) skill or the compound-engineering reviewer agents are installed, prefer delegating to them — they're deeper than re-deriving the checks here. Otherwise use the inline guidance below so the skill still works standalone.

### Ground every finding (and every suggested fix) before reporting it

A wrong finding or a fix that makes things worse erodes the user's trust faster than a missed nit, so guard against the two failure modes that actually happen:

- **Verify a suggested token/value resolves to something sensible — don't trust the name.** Before recommending "use `text-X-foreground`" (or any token, variable, or class), trace what it actually resolves to in the theme/token files. A `-foreground` token is frequently *white* (designed to sit on a solid background) and will **fail contrast on a pale tint** — recommending it by name alone can make the very problem you flagged worse. Confirm the resolved colour/value clears the bar before suggesting it.
- **Confirm "duplicated" / "already defined elsewhere" claims with a grep, not by eyeballing.** It's easy to misread one block in a diff as a second copy. If you assert something is duplicated, name both locations (`file:line` × 2). If a grep finds only one occurrence, it's not a finding.
- **Confirm a suggested primitive can actually carry the meaning.** Before saying "use the shared `Badge`/`Button`/etc.", check its variants. If the primitive has no variant for the semantic case (e.g. no warning/success), swapping to it would flatten meaning — say that instead of suggesting a regression.

### Check A — Code quality / developer standards

The question: *is this code something a senior engineer would be happy to merge?* The user can't judge this themselves, so be their proxy. Look for:

- **Simplicity** — the most over-engineered or convoluted thing that could be simpler. Unnecessary abstractions, indirection, or cleverness where plain code would do. Dead code, commented-out blocks, unused variables/imports.
- **Readability** — unclear names, functions doing too many things, missing structure that would help a future reader.
- **Maintainability** — duplication that will drift out of sync, tight coupling between things that should be independent, magic numbers/strings that should be named.
- **Obvious correctness risks** — unhandled error/empty/loading states, off-by-one and boundary cases, race conditions in async UI, missing null/undefined guards. Flag only things you're genuinely confident about; this is not a substitute for tests.
- **Consistency with the repo** — does the new code follow the patterns already established in neighbouring files (file layout, naming, how state/data is handled)? Reinventing a local convention is a finding.

Match the project's existing style — don't impose a foreign one. The bar is "fits the codebase and is clean", not "matches my personal taste".

### Check B — Accessibility

Audit the changed pages and components against **WCAG 2.2 AA**. If `a11y-audit` is installed, run it on the in-scope files. Otherwise cover the essentials:

- **Semantics** — real `<button>`/`<a>`/headings/lists/labels, not `<div onClick>`; one logical heading order; form inputs have real labels (placeholder ≠ label).
- **Contrast** — text and UI meets 4.5:1 (3:1 for large text / UI components), in every theme variant the project supports.
- **Keyboard** — everything operable without a mouse; visible focus; no traps; logical focus order; focus managed on open/close of dialogs and panels.
- **Targets & input** — interactive targets ~24px+; anything drag- or hover-only has a non-drag, non-hover alternative.
- **Screen reader** — meaningful names on controls and icons-as-buttons; state communicated (`aria-expanded`, `aria-current`, etc.); decorative images hidden.

For each issue give the exact location and the user-facing consequence ("a keyboard user can't reach the close button"), since that's what makes it real to a non-engineer.

### Check C — Design-system conformance

The question: *does this implementation reuse the project's design system, or quietly reinvent it?* Auto-detect what the system is, then check the new code against it.

**First, learn the system** by inspecting the repo (this is the one place you read beyond the diff):
- design tokens / CSS custom properties / theme files (e.g. `theme.css`, `tokens.*`, a `--ref/--sys/--ts` layering, design-token JSON),
- a component library or primitives folder (e.g. `ds/`, `ui/`, `components/ui`),
- a Tailwind / styling config defining the scale (colors, spacing, radius, typography),
- and the patterns already used by similar, established components.

**Then flag where the changed code departs from it:**
- Hardcoded values that should be tokens — raw hex/rgb colours, pixel spacing, font sizes, radii, shadows that bypass the token scale.
- One-off components that duplicate something the design system already provides (a bespoke button/modal/input instead of the shared primitive).
- Off-pattern markup or structure that breaks the conventions neighbouring components follow.
- Inconsistent spacing/typography/colour vs the established scale.

If the repo has **no detectable design system**, say so plainly and skip this check rather than inventing standards — flag only outright internal inconsistency (the same thing styled two different ways across the changed files).

## Step 2 — One prioritised report

Merge the three checks into a single report. Group by check, and within each, tag every finding by severity so the user knows what actually blocks a PR vs what's nice-to-have:

- **Critical** — would break for users, is inaccessible, or no engineer would merge it. Fix before the PR.
- **Important** — real quality/consistency problem worth fixing now, but not a hard blocker.
- **Polish** — minor; fix if quick, otherwise note it.

Use this structure:

```
# Pre-flight report — <branch> (vs <base>)
Files reviewed: <n>

## Summary
<2–3 sentences: overall readiness, and the headline issues. Is this PR-ready?>

## 🔴 Code quality / developer standards
- [Critical|Important|Polish] <file:line> — <what> 
  Why it matters: <plain-language consequence>
  Suggested fix: <concrete change>

## ♿ Accessibility (WCAG 2.2 AA)
- [severity] <file:line> — <what>
  Why it matters: <user-facing consequence>
  Suggested fix: <concrete change>

## 🎨 Design-system conformance
- [severity] <file:line> — <what>
  Why it matters: <consequence for consistency/maintainability>
  Suggested fix: <the token/component to use instead>

## Verdict
<Ready to raise · Ready after Critical fixes · Needs work> — one line.
```

Every finding needs a `file:line`, a plain-language *why*, and a concrete suggested fix. A finding the user can't understand or act on is noise. If a check came back clean, say so explicitly — silence reads as "skipped".

## Step 3 — Fix gate

After presenting the report, **stop and ask** which findings to fix. Offer sensible groupings ("all Critical", "all accessibility", "everything", "none — I'll handle it"). This gate is the whole safety contract: do not edit anything before the user chooses.

Then:
1. Apply only the approved fixes, each as a small, focused change. Prefer the minimal targeted edit — if a "fix" (e.g. a formatter run) would rewrite far more than the finding, do the narrow change instead, or leave a cosmetic nit noted rather than burying the diff in churn.
2. Re-check each fix actually resolved its finding — check the *resolved outcome*, not just that the edit applied. Confirm the new token/value clears the bar (e.g. recompute contrast), and that you didn't introduce a new problem. If a suggested fix turns out to be wrong or would make things worse, revert it and tell the user plainly rather than shipping it.
3. Run the project's typecheck/lint if available, so you don't hand back a broken tree.
4. Summarise what changed, file by file, in plain language — and call out anything you deliberately skipped and why (false positives, fixes that would regress, cosmetics not worth the churn) — so the user can describe their own PR and trust what's in it.

Leave committing, pushing, and opening the PR to the user (or to their `ship`/PR skill). Pre-flight's job ends at a clean, understood diff.
