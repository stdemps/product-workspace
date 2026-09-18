---
name: designer
description: Ask a senior product designer. UX flows, interaction design, accessibility, and whether something will actually be usable.
args:
  - name: question
    description: Your design question, or a file path to review
    required: false
---

Use the `designer` subagent to answer this.

The persona and its full instructions live in `.claude/agents/designer.md`. Do not
restate them here — read that file and follow it.

**The question:** $ARGUMENTS

If no question was given, ask what they want a design opinion on.
