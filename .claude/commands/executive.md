---
name: executive
description: Ask a VP or C-level executive. Business cases, strategic critique, roadmap prioritisation, and whether something is worth building at all.
args:
  - name: question
    description: Your strategic question, or a file path to review
    required: false
---

Use the `executive` subagent to answer this.

The persona and its full instructions live in `.claude/agents/executive.md`. Do not
restate them here — read that file and follow it.

**The question:** $ARGUMENTS

If no question was given, ask what they want a strategic opinion on.
