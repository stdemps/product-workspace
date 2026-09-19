# Setting up the agent

> **Three docs, three jobs.** [README.md](README.md) explains what this
> template is. [SETUP.md](SETUP.md) gets the code running. This page gets the
> *agent* running.

The repo already ships the skills, the agent personas and the project rules.
Those work as soon as you clone.

This page covers the rest: the plugins, the connectors and the two settings you
choose for yourself. Nothing here runs automatically. You run each step and you
can read it first.

Budget about ten minutes. You can stop after Step 1 and still have a working
setup.

---

## What you get without doing anything

Clone the repo, run `npm install`, open it in Claude Code. You already have:

- All the skills in `.claude/skills/` (`/preflight`, `/a11y-audit`, `/ux-designer`, and the rest)
- The agent personas in `.claude/agents/` (`/engineer`, `/designer`, `/pm`)
- The project rules in `.claude/CLAUDE.md`
- The pre-commit quality gate (`npm install` switches it on via the `prepare` script)
- The shared settings in `.claude/settings.json`

Type `/meet-your-agent` and start. Everything below is optional.

---

## Step 1 — Plugins (the big one)

About half the useful skills come from plugins, not from this repo. Without
them, commands like `/brainstorm` and `/ce-code-review` will not exist.

Each of these is third-party code that runs on your machine. Install the ones
you want, not the whole list by reflex.

Run in Claude Code:

```
/plugin install superpowers@claude-plugins-official
/plugin install skill-creator@claude-plugins-official
/plugin install mcp-server-dev@claude-plugins-official
/plugin install security-guidance@claude-plugins-official
```

Those four are from Anthropic's official marketplace.

**Optional, depending on your stack:**

```
/plugin install vercel@claude-plugins-official
/plugin install firebase@claude-plugins-official
```

**Optional, third-party.** This one is not from Anthropic. It is a public
GitHub repo by Every Inc. Read it before you install it:
<https://github.com/EveryInc/compound-engineering-plugin>

```
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering@compound-engineering-plugin
```

Check what landed:

```
/plugin list
```

---

## Step 2 — Two settings you pick yourself

These are deliberately **not** in `.claude/settings.json`, because the right
answer depends on you.

### Model

The repo does not pin a model. You keep whatever your plan gives you.

If you have access to a large-context Opus tier and want to match the setup
this template was built on, add to your own `~/.claude/settings.json`:

```json
{ "model": "opus[1m]" }
```

Skip this if you are unsure. A pinned model you cannot access will just fail,
and a premium tier costs more per session.

### Permission mode

By default Claude Code asks before it runs commands. That is a lot of prompts.

You can turn the prompts off:

```json
{ "permissions": { "defaultMode": "auto" } }
```

**Understand what this does before you use it.** In `auto` mode the agent runs
commands without asking you first. That is a reasonable trade in a repo you
trust and a directory you own. It is a bad idea in a repo you just cloned from
a stranger, or anywhere near production credentials.

The template does not set this for you on purpose. Turn it on yourself, once
you have read enough of the repo to trust it.

---

## Step 3 — Output style (optional)

This template was written for a designer, not an engineer. The `ELI5` style
makes the agent answer in short plain sentences instead of paragraphs of
detail.

It ships at `.claude/output-styles/ELI5.md`. Switch it on with:

```
/output-style ELI5
```

To go back to normal:

```
/output-style default
```

---

## Step 4 — Connectors (only if you need them)

One shipped skill talks to an outside service: `/paper-sync` needs the **Paper**
connector. Without it, that one skill fails with a connection error. That is
expected, not a bug.

Connect it in your Claude settings, under connectors. **Every other skill in
this repo works offline.**

---

## Check it worked

```
/plugin list
```

You should see the plugins you installed.

Then open Claude Code in the repo and type `/` — you should see the repo's own
skills (`/preflight`, `/a11y-audit`, `/engineer`) alongside any plugin ones.

If a skill is missing, it belongs to a plugin you skipped. That is fine.

One thing to know: blogs and other people's setups reference skills that live
on *their* machine, not in any plugin. If a command you read about somewhere
does not exist here and no plugin provides it, that is why — it was never part
of this template.

---

## A note on `.claude/settings.json`

`.claude/settings.json` is committed and shared. Keep it free of anything
personal.

Your own overrides go in `.claude/settings.local.json`, which is gitignored and
never leaves your machine. Put your model choice, your permission mode and any
project names or hostnames there.

Do not paste your global `~/.claude/settings.json` into the committed file. It
can carry your cloud project IDs, deployment targets and internal hostnames.
