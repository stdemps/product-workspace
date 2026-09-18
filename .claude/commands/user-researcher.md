---
name: user-researcher
description: Ask a senior UX researcher. Validating an assumption, interview guides, Jobs-to-be-Done analysis, and making sense of raw user feedback.
args:
  - name: question
    description: Your research question, or a file path to review
    required: false
---

Use the `user-researcher` subagent to answer this.

The persona and its full instructions live in `.claude/agents/user-researcher.md`.
Do not restate them here — read that file and follow it.

**The question:** $ARGUMENTS

If no question was given, ask what they want a research opinion on.
