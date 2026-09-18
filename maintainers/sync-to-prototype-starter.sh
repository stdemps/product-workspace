#!/bin/bash

# Sync agent updates from product-workspace to prototype-starter.
# Only copies into existing directories so we don't create a full agent stack in a minimal repo.
#
# Usage:
#   PROTOTYPE_STARTER=/path/to/prototype-starter ./maintainers/sync-to-prototype-starter.sh
#   ./maintainers/sync-to-prototype-starter.sh /path/to/prototype-starter
#
# See: maintainers/sync-agent-updates-to-prototype-starter.md

set -e

PRODUCT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="${PROTOTYPE_STARTER:-$1}"

if [ -z "$DEST" ] || [ ! -d "$DEST" ]; then
  echo "Usage: PROTOTYPE_STARTER=/path/to/prototype-starter $0"
  echo "   or: $0 /path/to/prototype-starter"
  echo ""
  echo "DEST must be an existing directory."
  exit 1
fi

echo "Syncing agent updates from product-workspace to: $DEST"
echo ""

# Cursor agent rules (only if destination exists)
if [ -d "$DEST/.cursor/rules/agents" ]; then
  echo "Copying .cursor/rules/agents/*.mdc ..."
  for f in engineer designer pm executive user-researcher brand-identity designer-prd-to-ux ux-to-implementation-plan pm-clarify-prd pm-generate-prd; do
    [ -f "$PRODUCT_ROOT/.cursor/rules/agents/${f}.mdc" ] && cp "$PRODUCT_ROOT/.cursor/rules/agents/${f}.mdc" "$DEST/.cursor/rules/agents/"
  done
else
  echo "Skipping .cursor/rules/agents (destination not present)"
fi

# Docs
if [ -d "$DEST/docs" ]; then
  echo "Copying docs/agent-tools-and-context.md ..."
  cp "$PRODUCT_ROOT/docs/agent-tools-and-context.md" "$DEST/docs/"
  [ -f "$PRODUCT_ROOT/maintainers/sync-agent-updates-to-prototype-starter.md" ] && cp "$PRODUCT_ROOT/maintainers/sync-agent-updates-to-prototype-starter.md" "$DEST/maintainers/"
else
  echo "Skipping docs (destination not present)"
fi

# Claude agents
if [ -d "$DEST/.claude/agents" ]; then
  echo "Copying .claude/agents/*.js ..."
  for f in engineer designer pm executive user-researcher; do
    [ -f "$PRODUCT_ROOT/.claude/agents/${f}.js" ] && cp "$PRODUCT_ROOT/.claude/agents/${f}.js" "$DEST/.claude/agents/"
  done
else
  echo "Skipping .claude/agents (destination not present)"
fi

# Claude skills
if [ -d "$DEST/.claude/skills" ]; then
  echo "Copying .claude/skills (selected) ..."
  # Legacy single-file skills (still .js)
  for f in engineer-review.js designer-review.js designer-brand-identity.js prd-review.js; do
    [ -f "$PRODUCT_ROOT/.claude/skills/$f" ] && cp "$PRODUCT_ROOT/.claude/skills/$f" "$DEST/.claude/skills/"
  done
  # SKILL.md folder skills (auto-discovered by Claude Code)
  for d in pm-generate-prd pm-clarify-prd designer-prd-to-ux ux-to-implementation-plan; do
    if [ -d "$PRODUCT_ROOT/.claude/skills/$d" ]; then
      mkdir -p "$DEST/.claude/skills/$d"
      cp "$PRODUCT_ROOT/.claude/skills/$d/SKILL.md" "$DEST/.claude/skills/$d/"
    fi
  done
else
  echo "Skipping .claude/skills (destination not present)"
fi

# MCP config (optional)
if [ -d "$DEST/.cursor" ]; then
  echo "Copying .cursor/mcp.json ..."
  cp "$PRODUCT_ROOT/.cursor/mcp.json" "$DEST/.cursor/"
else
  echo "Skipping .cursor/mcp.json (destination .cursor not present)"
fi

echo ""
echo "Done. See maintainers/sync-agent-updates-to-prototype-starter.md for manual steps (SETUP.md, README)."
