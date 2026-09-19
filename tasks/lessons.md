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

## 2026-09-19: A file outside the expected folder is not dead code

**What went wrong.** Three times in one session, files were recommended for deletion
because they sat outside the folder the tool loads from. All three recommendations
were wrong:

- `.cursor/` (281 files) looked like a duplicate of `.claude/`. Cursor does not read
  `.claude/` at all — deleting it would have silently removed every Cursor rule.
- `agents/*.md` looked like stale copies of `.claude/agents/`. They are portable
  personas for tools that are not Claude Code, referenced six times in the prompt
  library, and `agents/README.md` says so.
- `skills/brand-identity/` and `skills/prd-writing/` looked like skills in a folder
  Claude Code never scans. True — but they hold five resource files (design tokens,
  the PRD template, voice-and-tone) that exist nowhere else, read by path from eight
  Cursor rules.

**Why it happened.** One correct fact — "Claude Code only loads `.claude/skills/`" —
got applied as a universal rule. But a repo can serve several tools at once, and a
file can be a resource read by path rather than a skill discovered by a scanner.
"This tool ignores it" and "nothing uses it" are different claims, and only the first
one had been checked.

**The rule.** Before calling any file redundant, grep the whole repo for its name and
its path. If something references it, find out what that something is for. Ask "which
tool reads this, and how does it find it?" — discovery by scan and reference by path
have different rules. And when the answer is "delete N files", say the number out
loud first: a big number deserves a second check, not more confidence.

---

## 2026-09-19: A check that cannot fail has not passed

**What went wrong.** Both repos were merged to `main` after `npm ci` was reported as
passing. CI then failed immediately on both, on that exact command: the lockfile was
internally inconsistent and `npm ci` refuses an inconsistent lockfile.

The check had been run in the project directory, where `node_modules` was already
populated. With nothing to install, `npm ci` had nothing to verify, printed success,
and was believed. Copying only `package.json` and `package-lock.json` into an empty
directory reproduced the failure in about two seconds.

**Why it happened.** The command was right and the environment was wrong. `npm ci`
only tests what it claims to test when it starts from nothing, and the whole point of
running it was to simulate a fresh clone — the one condition the local run did not
meet. Worse, this check had been chosen *specifically* to catch what `npm install`
hides, so its false pass was more convincing than no check at all.

**The rule.** When a check exists to simulate a different environment, run it in that
environment. For `npm ci`, copy `package.json` and `package-lock.json` into an empty
directory, or clone to a temp path — never run it where `node_modules` already exists.

More generally: before trusting a green result, ask **what would have made this fail?**
If the answer is "nothing, in the state I ran it in", the check proved nothing. This is
the same trap as a test whose assertions sit behind a false `if` — see the entry below
on tests that pass without checking anything. A check that cannot fail is not evidence,
and reporting it as evidence spends trust that is hard to earn back.

Related: `npm install` and `npm ci` disagree on purpose. `install` will repair a
lockfile as it goes; `ci` refuses it. So after any dependency change, the lockfile
needs the strict check, not the forgiving one.

---

## 2026-09-19: It works on my machine because my machine is not the repo

**What went wrong.** Three separate things were reported as working when they only
worked locally and shipped to nobody: the `typecheck` script existed in an
uncommitted `package.json`, `tasks/lessons.md` was created but never `git add`ed, and
the `executor` agent lived only in the user's global `~/.claude/` config. In the last
case a prompt had already been written telling users to hand work to that agent.

**Why it happened.** Every check was run in the working directory, where all three
were present. Nothing was ever checked from the perspective of someone cloning the
repo. For agents and skills this is especially easy to miss, because a global
`~/.claude/` definition makes a project-level one look like it is working.

**The rule.** For anything a user is told to run, verify it is **tracked**, not just
present: `git ls-files -- <path>` returns nothing for a file that will not ship. When
adding an agent or skill, check whether it resolves from the repo or from global
config — if it only exists globally, it does not ship. And staged deletions with
untracked replacements are the sharp edge of this: `git status --porcelain` before
committing a migration, or the commit records the removals and not the additions.

---

## Starter lessons

These came from a large production project and were rewritten to apply to any
project. They are here so the file was useful on day one. The dated entries above
came from real sessions on this template - add your own at the top.

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

One real caveat: `core.hooksPath` is **per clone**, not committed. This template now
sets it from a `prepare` script, so `npm install` switches the gate on for you. If the
gate ever looks like it is not running, check `git config core.hooksPath` before
assuming the hook is broken - and remember `prepare` runs on `npm install`, not on a
bare `git clone`.

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
