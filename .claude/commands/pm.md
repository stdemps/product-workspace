---
name: pm
description: Ask a senior product manager. Problem framing, cutting scope for an MVP, success metrics, and prioritising a feature wishlist.
args:
  - name: question
    description: Your product question, or a file path to review
    required: false
---

Use the `pm` subagent to answer this.

The persona and its full instructions live in `.claude/agents/pm.md`. Do not
restate them here — read that file and follow it.

**The question:** $ARGUMENTS

If no question was given, ask what they want a product opinion on.
