#!/bin/bash
#
# Warns when a slash command in .claude/commands and its copy in
# .cursor/commands say different things. The Cursor copy should be the
# Claude copy minus the --- header --- block (Cursor doesn't use it).
#
# Commands that exist for only one tool are fine — e.g. Cursor gets the
# personas as rules in .cursor/rules/agents/ instead.
#
# Exits 1 if anything drifted. The pre-commit hook only warns on it.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Text without the header block and leading blank lines.
body() { awk 'NR==1 && /^---$/ {h=1; next} h && /^---$/ {h=0; next} !h' "$1" | sed '/./,$!d'; }

drift=0
for claude in "$ROOT"/.claude/commands/*.md; do
  cursor="$ROOT/.cursor/commands/$(basename "$claude")"
  [ -f "$cursor" ] || continue
  if [ "$(body "$claude")" != "$(body "$cursor")" ]; then
    echo "⚠️  $(basename "$claude"): the .claude and .cursor copies differ"
    drift=1
  fi
done

if [ $drift = 1 ]; then
  echo "   Edit the .claude copy, then paste its text (without the --- header) into .cursor/commands."
fi
exit $drift
