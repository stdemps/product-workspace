---
name: collab
description: Get Engineer, Designer, and PM perspectives on one question in parallel, then synthesise them into a single recommendation. Use this skill when a decision has technical, design, and product trade-offs at once and you want the tensions between them surfaced rather than a single viewpoint.
---

# Multi-Agent Collaboration

Gathers three independent expert perspectives on the same question, then
synthesises them. Use this when a decision sits at the intersection of
engineering, design, and product — where a single perspective would miss the
trade-offs.

## How to run it

This skill is backed by a script, because the three agents run as separate
processes so their perspectives stay genuinely independent rather than
blending together in one context.

Run it with Bash:

```bash
node .claude/skills/collab/collab.js "<the question>"
```

Example:

```bash
node .claude/skills/collab/collab.js "Should settings be a modal or a slide-over?"
```

## What comes back

The script prints, in order:

1. **Engineer Perspective** — feasibility, architecture, performance, effort
2. **Designer Perspective** — user flow, accessibility, interaction patterns
3. **PM Perspective** — problem framing, scope, priority, success metrics
4. **A synthesis request**

## Your job after running it

Read all three perspectives, then follow the synthesis request at the bottom
of the output. Produce:

1. **Where they agree** — the points all three converge on
2. **Where they pull apart** — the real trade-offs, named explicitly
3. **A recommendation** — one clear call that balances the three
4. **What to validate** — open questions or checks before committing

Do not simply concatenate the three perspectives. The value of this skill is
the synthesis. If the three agree on everything, say so plainly and briefly —
that itself is a useful signal that the decision is low-risk.

## When not to use it

- The question is purely technical → use `/engineer`
- The question is purely about UX → use `/designer`
- The question is purely about scope or priority → use `/pm`
- You are reviewing a document → use `/prd-review`

Three perspectives on a one-perspective question is just slower.
