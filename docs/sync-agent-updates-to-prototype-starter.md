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

---

## Security and template readiness (optional sync)

When product-workspace gains security or template-readiness improvements, consider sending these to prototype-starter so both templates stay consistent and safe-by-default.

### Recommended to send

| What | Why |
|------|-----|
| **SECURITY.md** | Same secrets/auth/validation guidance; prototypes often add APIs or env vars. |
| **Secure API + contact form** | One copy-paste pattern (`app/api/contact/route.ts` + form + contact page) so prototypes that add a form or API start from a validated, safe example. |
| **README Security subsection** | Short block linking to SECURITY.md and “never commit .env.local” so it’s discoverable. |
| **SETUP Security tooling + template/Playwright note** | Same “never commit secrets” and, if prototype-starter has a template script + E2E, the note about running the template script before Playwright so title assertions stay in sync. |
| **CI workflow** | At least lint + type-check (and optionally E2E with `test:ci` if prototype-starter has Playwright). Keeps prototypes from drifting. |

### Optional for prototype-starter

| What | Why |
|------|-----|
| **docs/examples/github-actions-sast.yml** | Reference only; add when prototype-starter starts running SAST in CI. |
| **docs/production-hardening.md** | Lower priority; or add a one-line link: “If you promote to production, see product-workspace’s production-hardening checklist.” |

### Files to copy (from product-workspace root)

```bash
# Assume PROTOTYPE_STARTER is set (e.g. ../prototype-starter)

# Core security doc (adapt intro if prototype-starter is minimal)
cp SECURITY.md $PROTOTYPE_STARTER/

# Example secure API + form (only if prototype-starter has same app/ structure and deps: zod, react-hook-form, shadcn form/input/textarea/button)
mkdir -p $PROTOTYPE_STARTER/app/api/contact $PROTOTYPE_STARTER/app/contact
cp app/api/contact/route.ts        $PROTOTYPE_STARTER/app/api/contact/
cp components/contact-form.tsx     $PROTOTYPE_STARTER/components/
cp app/contact/page.tsx            $PROTOTYPE_STARTER/app/contact/

# Example workflows (copy into docs/examples or .github/workflows as desired)
mkdir -p $PROTOTYPE_STARTER/docs/examples
cp docs/examples/github-actions-ci.yml    $PROTOTYPE_STARTER/docs/examples/
cp docs/examples/github-actions-sast.yml $PROTOTYPE_STARTER/docs/examples/
```

Then in prototype-starter:

- **README:** Merge in the “Security” section (link to SECURITY.md, short tooling line).
- **SETUP:** Merge in the “Security tooling” subsection and the “run template script before Playwright” note under Customize Project (if it has that script and E2E).
- **CI:** Either copy `.github/workflows/ci.yml` and add `test:ci` to package.json if they have Playwright, or add a lighter CI (lint + tsc only) and document it in README.
- **Home page:** Optionally add a “Contact” card/link to `/contact` like product-workspace, or leave the homepage as-is.

### What to skip or shorten

- **Production-hardening checklist** – Omit or a single link; prototype-starter is not aimed at production by default.
- **Long SAST/security rules** – Only add if prototype-starter already uses `.cursor/rules` for security; otherwise SECURITY.md is enough.
