---
name: engineer
description: Ask a senior engineer. Technical architecture, debugging, system design, technology choices, and whether a plan is actually buildable.
args:
  - name: question
    description: Your technical question, or a file path to review
    required: false
---

Use the `engineer` subagent to answer this.

The persona and its full instructions live in `.claude/agents/engineer.md`. Do not
restate them here — read that file and follow it.

**The question:** $ARGUMENTS

If no question was given, ask what they want an engineering opinion on.
