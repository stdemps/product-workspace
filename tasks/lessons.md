# Lessons Learned

Patterns to avoid repeating. **Review this at the start of each session.**

## How this file works

Every time you correct the agent, a new entry goes here. Over time this becomes
the most valuable file in the project: it is how the agent stops making the same
mistake twice.

Each entry has three parts, and all three matter:

- **What went wrong** — the symptom, as you saw it
- **Why it happened** — the real cause, not the surface one
- **The rule** — what to do instead, phrased as an instruction

Write the rule so a stranger could follow it without reading the rest of the entry.
A lesson with no rule is a diary entry, and nobody acts on a diary.

Newest entries go at the top, under a dated heading.

---

## Starter lessons

These came from a large production project and were rewritten to apply to any
project. They are here so the file is useful on day one. Keep them, and add your
own above them as you go.

---

## A green check is not proof the app runs

**What went wrong.** A change was reported as verified because the linter and the
typechecker both passed. The app then failed when someone actually opened it.

**Why it happened.** Each check only sees part of the picture. A linter reads
style. A typechecker reads types. Neither one builds the app, and neither one
opens a page. Treating any single green check as "it works" is the mistake — not
the check itself.

**The rule.** Before calling a change done, run `npm run build`. A build failure
is the cheapest kind to find. For anything a user can see, also open the page and
look at it. If you did not run the command, do not say it passed — say you did
not run it.

---

## Check a safeguard in the place it actually lives

**What went wrong.** This repo's pre-commit checks were reported as "never wired
up, never run". That was wrong. The check was installed and working the whole
time. The report was based on looking in `.git/hooks/`, which was empty.

**Why it happened.** Git has two places a hook can live. This repo uses
`core.hooksPath` to point at `.githooks/`, and when that is set, `.git/hooks/` is
ignored. An empty `.git/hooks/` therefore proves nothing. The mistake was reading
one location and reporting a conclusion about the whole system.

**The rule.** To find out whether a safeguard runs, **run it** — here, that is
`.githooks/pre-commit`. Do not infer it from a directory listing. Check
`git config core.hooksPath` before concluding a git hook is missing. More
generally: when a check looks absent, confirm you are looking where this project
puts it, then prove the answer by executing it rather than by reading around it.

One real caveat: `core.hooksPath` is **per clone**, not committed. A fresh clone
of this template has it unset, so the gate genuinely will not run until someone
runs `git config core.hooksPath .githooks`. Do that first in any new clone.

---

## A test can pass without ever checking anything

**What went wrong.** A test was green, so the feature was called done. The feature
was broken. Reading the test showed its assertions sat inside an `if` that was
never true, so the test passed by skipping its own checks.

**Why it happened.** A passing test and a test that proved something are not the
same thing. A guard around an assertion, a `test.skip`, or a selector that matches
nothing all produce green. Green means "did not fail", not "verified".

**The rule.** When a test guards its assertions behind a condition, make the test
fail on purpose first — break the code it covers and watch it go red. If it stays
green, the test is decoration. This is also why you write the failing test *before*
the fix: a test you never saw fail has never been proven to work.

---

## A subagent can finish its work and never tell you

**What went wrong.** Work was handed to a subagent. The subagent went quiet. From
the silence alone there was no way to tell whether it had done everything, done
nothing, or done something wrong.

**Why it happened.** The return message was the only record of the work, and the
return message did not arrive. Silence looks identical in every case.

**The rule.** Tell every subagent to write its report to a file as its final
action, and say why in the prompt. The file survives; the message may not. If a
subagent goes quiet, check `git status` and `git log` before handing the work out
again — it may already be done, and running it twice can undo it. Check what a
subagent claims against the actual code either way.

---
