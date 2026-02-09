# Syncing Agent Updates to Prototype-Starter

When you update agents, tools-and-context guidance, or MCP config in **product-workspace**, use this guide to copy the relevant changes into **prototype-starter** (if that template has a similar structure).

## What Was Updated in Product-Workspace

### 1. Tools & context guidance

- **Doc:** [docs/agent-tools-and-context.md](./agent-tools-and-context.md) — per-agent recommended tools (file read/write, terminal, Playwright MCP) and how to give context in Cursor and CLI.
- **Cursor rules:** Each file in `.cursor/rules/agents/*.mdc` now has a **Tools & Context** section pointing to that doc and stating which tools to use (read, write, terminal, Playwright MCP, AskUserQuestion).
- **Claude agents:** Each file in `.claude/agents/*.js` (engineer, designer, pm, executive, user-researcher) has a **Tools & Context** section in the persona string.
- **Claude skills:** `.claude/skills/` — engineer-review, designer-review, designer-prd-to-ux, ux-to-implementation-plan, designer-brand-identity, pm-clarify-prd, and prd-review now include Tools & Context (or equivalent instructions).

### 2. Playwright MCP

- **Config:** `.cursor/mcp.json` — Playwright MCP server.
- **Docs:** SETUP.md (step 6) and README (Testing section) describe enabling Playwright MCP and link to agent-tools-and-context.

### 3. Naming consistency (ux-to-implementation-plan)

- Cursor rule: `.cursor/rules/agents/ux-to-implementation-plan.mdc`
- Claude skill: `.claude/skills/ux-to-implementation-plan.js`
- All docs and pipeline diagrams use `/ux-to-implementation-plan`.

---

## When to Sync to Prototype-Starter

**Prototype-starter** is the minimal template (“quick prototyping”, “don’t need agent orchestration”). So:

- **If prototype-starter has no agents:** You may still want to copy:
  - `docs/agent-tools-and-context.md` (if you add agents later or use Cursor with generic AI).
  - `.cursor/mcp.json` and SETUP/README Playwright MCP steps (optional; for browser automation in Cursor).
- **If prototype-starter has a subset of agents (e.g. only Cursor rules):** Copy the updated `.cursor/rules/agents/*.mdc` files and `docs/agent-tools-and-context.md` so the same tool/context guidance is available.
- **If prototype-starter has the full stack (`.claude/agents/` and `.claude/skills/`):** Copy the files listed below so both templates stay in sync.

---

## Files to Copy (Full Sync)

Assume `PROTOTYPE_STARTER` is the path to the prototype-starter repo (e.g. `../prototype-starter`).

### Cursor rules (agents)

```bash
# From product-workspace root
cp .cursor/rules/agents/engineer.mdc           $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/designer.mdc          $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/pm.mdc               $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/executive.mdc        $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/user-researcher.mdc $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/brand-identity.mdc  $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/designer-prd-to-ux.mdc        $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/ux-to-implementation-plan.mdc $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/pm-clarify-prd.mdc  $PROTOTYPE_STARTER/.cursor/rules/agents/
cp .cursor/rules/agents/pm-generate-prd.mdc $PROTOTYPE_STARTER/.cursor/rules/agents/
```

(Only copy files that exist in prototype-starter; create `agents` dir if needed.)

### Docs

```bash
cp docs/agent-tools-and-context.md           $PROTOTYPE_STARTER/docs/
cp docs/sync-agent-updates-to-prototype-starter.md $PROTOTYPE_STARTER/docs/  # optional
```

### Claude agents (if prototype-starter has .claude/agents/)

```bash
cp .claude/agents/engineer.js    $PROTOTYPE_STARTER/.claude/agents/
cp .claude/agents/designer.js    $PROTOTYPE_STARTER/.claude/agents/
cp .claude/agents/pm.js          $PROTOTYPE_STARTER/.claude/agents/
cp .claude/agents/executive.js   $PROTOTYPE_STARTER/.claude/agents/
cp .claude/agents/user-researcher.js $PROTOTYPE_STARTER/.claude/agents/
```

### Claude skills (if prototype-starter has .claude/skills/)

```bash
cp .claude/skills/engineer-review.js      $PROTOTYPE_STARTER/.claude/skills/
cp .claude/skills/designer-review.js     $PROTOTYPE_STARTER/.claude/skills/
cp .claude/skills/designer-prd-to-ux.js   $PROTOTYPE_STARTER/.claude/skills/
cp .claude/skills/ux-to-implementation-plan.js $PROTOTYPE_STARTER/.claude/skills/
cp .claude/skills/designer-brand-identity.js   $PROTOTYPE_STARTER/.claude/skills/
cp .claude/skills/pm-clarify-prd.js       $PROTOTYPE_STARTER/.claude/skills/
cp .claude/skills/prd-review.js           $PROTOTYPE_STARTER/.claude/skills/
```

### MCP and setup (optional for minimal template)

```bash
cp .cursor/mcp.json $PROTOTYPE_STARTER/.cursor/
# Then merge or copy SETUP.md step 6 (Playwright MCP) and README Testing/Playwright MCP line into prototype-starter’s SETUP.md and README if desired.
```

---

## Script

From product-workspace root:

```bash
# Set path to your prototype-starter repo, then run:
PROTOTYPE_STARTER=/path/to/prototype-starter ./scripts/sync-to-prototype-starter.sh

# Or pass as first argument:
./scripts/sync-to-prototype-starter.sh /path/to/prototype-starter
```

The script only copies into **existing** directories (e.g. if prototype-starter has no `.claude/agents/`, those files are skipped), so it won’t create a full agent stack in a minimal repo by accident.

---

## After Copying

1. In prototype-starter, ensure any paths in the copied files (e.g. `docs/agent-tools-and-context.md`, `docs/prds/template-prd.md`) exist or adjust paths if the repo layout differs.
2. If prototype-starter uses a different `claude.json`, add or update the `ux-to-implementation-plan` skill entry to point to `./skills/ux-to-implementation-plan.js`.
3. Run a quick sanity check (e.g. run one agent or skill in prototype-starter) to confirm nothing is broken.
