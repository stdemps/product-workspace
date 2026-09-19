# Skills & Commands Guide

There is a lot here. **You do not need to learn it.** Find your question below,
type the command, and ignore the rest until you need it.

## Start here

| If you are... | Type this |
|---|---|
| Opening this project for the first time | `/meet-your-agent` |
| About to raise a pull request | `/preflight` |
| Wondering which of these you actually need, after a few weeks | `/ai-harness-architect` |

## Find your question

**"I don't know what to build yet."**

| Question | Command |
|---|---|
| What problem are we solving? Is this scoped right? | `/pm` |
| Is this buildable? What's the risk? | `/engineer` |
| Is this worth building at all? | `/executive` |
| How do I validate this with users? | `/user-researcher` |
| Turn my rough idea into a PRD | `/pm-generate-prd` |
| My PRD is vague — interrogate it | `/pm-clarify-prd` |
| What do all the roles think of this PRD? | `/prd-review` |

**"I know what to build. How should it work?"**

| Question | Command |
|---|---|
| How should this flow? Where will people get stuck? | `/ux-designer` |
| What should this button, error or empty state say? | `/ux-copywriter` |
| Turn my PRD into a UX spec | `/designer-prd-to-ux` |
| Turn that spec into a build plan | `/ux-to-implementation-plan` |

**"It exists. Why does it look wrong?"**

| Question | Command |
|---|---|
| Spacing, type, colour, dark mode — make it look right | `/ui-designer` |
| Build me a new interface from scratch | `/frontend-design` |
| Apply our brand to this | `/designer-brand-identity` |
| Show me palettes, fonts, chart types | `/ui-ux-pro-max` |

**"Is this good enough to ship?"**

| Question | Command |
|---|---|
| Check my branch before I raise a PR | `/preflight` |
| Can people with disabilities use this? | `/a11y-audit` |
| Review this from a designer's eye | `/designer-review` |
| Review this from an engineer's eye | `/engineer-review` |

**"Something needs doing to the setup itself."**

| Question | Command |
|---|---|
| Right-size my skills and tools | `/ai-harness-architect` |
| Let me click the app and leave notes for the agent | `/agentation` |
| Sync a screen to or from Paper | `/paper-sync` |

## Where your work gets written

Skills produce files. These are the folders they land in, and the templates to copy
when you are starting something by hand.

| Folder | What goes there | Templates |
|---|---|---|
| `docs/research/` | Interviews, synthesis, competitive scans | 3 |
| `docs/prds/` | PRDs and one-pagers | 2 |
| `docs/prototypes/` | Mockups, testing plans, design decisions | — |
| `tasks/lessons.md` | What went wrong and the rule that prevents it | — |
| `CURRENT-WORK.md` | What you are building now, and why | — |

**The usual path:** talk to people → `docs/research/` → `/pm-generate-prd` →
`/prd-review` → `/designer-prd-to-ux` → `/ux-to-implementation-plan` → the executor
agent builds it → `/preflight` before the pull request.

Each skill names the next one when it finishes, so you do not need to memorise that.

---

Everything below is detail on the same commands, grouped by how they work rather
than by what you want. Come back when you need it.

---

## UI/UX Refinement (Impeccable)

Use these commands to improve existing UI code. Run `/teach-impeccable` once to set up project context.

| Command | Purpose | When to use |
|---------|---------|-------------|
| `/audit` | Comprehensive quality check (a11y, perf, responsive) | Before shipping, after major changes |
| `/critique` | UX design review (hierarchy, clarity) | Early design feedback |
| `/polish` | Final refinement pass | Right before release |
| `/simplify` | Remove unnecessary complexity | When UI feels cluttered |
| `/normalize` | Align with design system | Inconsistent styling |
| `/optimize` | Performance improvements | Slow interactions |
| `/harden` | Error handling, edge cases | Production readiness |
| `/clarify` | Improve UX copy and labels | Confusing text |
| `/animate` | Add purposeful motion | Static feels lifeless |
| `/colorize` | Add strategic color | Too monochromatic |
| `/bolder` | Amplify understated designs | Too subtle |
| `/quieter` | Tone down aggressive designs | Too loud |
| `/delight` | Add moments of joy | Functional but boring |
| `/extract` | Create reusable components | Repeated patterns |
| `/adapt` | Responsive design fixes | Mobile issues |
| `/onboard` | Design onboarding flows | First-time UX |

**Tip:** Most commands accept an optional argument to focus on a specific area, e.g., `/audit navbar`

---

## Conversational Agents

Use these for quick questions and the PRD pipeline workflow.

| Agent | Purpose | Example |
|-------|---------|---------|
| `/engineer` | Technical questions, architecture | "How should I structure auth?" |
| `/designer` | UX questions, accessibility | "Best mobile nav pattern?" |
| `/pm` | Product strategy, scope | "Should we include this feature?" |
| `/executive` | Business cases, prioritization | "How do I pitch this to stakeholders?" |
| `/user-researcher` | User validation, research | "How do I test this assumption?" |

---

## Project Context

Capture product context (goals, personas, philosophy, priorities) so the AI has it every session. Run **`/setup-project-context`** to answer a short Q&A; optionally pass a PRD path to pre-fill (e.g. `/setup-project-context docs/prds/my-prd.md`). Writes to `.cursor/rules/project-context.mdc` (shared with Cursor). When you generate or share a first PRD, the PM skills may suggest this workflow. After you add or update research in `docs/research/` (e.g. `user-personas.md`, `pain-points-synthesis.md`), run **`/sync-research-to-context`** to update the User Personas (and optionally Key Terminology) section of project context from that research.

---

## PRD Pipeline Skills

For turning ideas into buildable specs.

| Skill | Purpose | Input → Output |
|-------|---------|----------------|
| `/pm-generate-prd` | Create PRD from idea | Idea → `docs/prds/feature.md` |
| `/pm-clarify-prd` | Refine PRD with Q&A | PRD → Refined PRD |
| `/designer-prd-to-ux` | Translate PRD to UX spec | PRD → `feature-ux-spec.md` |
| `/ux-to-implementation-plan` | Create implementation plan | UX spec → Task list |
| `/designer-brand-identity` | Brand tokens and voice | — → Design tokens |

---

## Reference Lookups (ui-ux-pro-max)

Use the Python CLI for specific lookups when you need data, not guidance.

```bash
# Generate a complete design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech dashboard" --design-system

# Look up specific palettes
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "healthcare" --domain color

# Look up font pairings
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant luxury" --domain typography

# Look up chart types
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "comparison trends" --domain chart
```

**Note:** This is a reference database, not primary design guidance. Use impeccable commands for actual design decisions.

---

## Other Skills

| Skill | Purpose |
|-------|---------|
| `/paper-sync` | Sync an implemented screen into **Paper** from code (Paper MCP or paste mode). Spec: `.claude/skills/paper-sync/SKILL.md` (mirror: `.cursor/skills/paper-sync/`). |
| `/vercel-react-best-practices` | React/Next.js performance patterns |
| `/agentation` | Add visual feedback toolbar |

---

## Recommended Workflow

1. **Set project context (once):** Run `/setup-project-context` to capture product context via Q&A; optionally pass a PRD path (e.g. `/setup-project-context docs/prds/my-prd.md`) to pre-fill. Suggested when you generate or share your first PRD.
2. **Starting a feature:** `/pm-generate-prd` → `/designer-prd-to-ux` → `/ux-to-implementation-plan`
3. **Quick question:** `/engineer`, `/designer`, or `/pm`
4. **Building UI:** Use `frontend-design` skill (auto-loaded)
5. **Design ↔ code alignment:** After implementing a screen, **`/paper-sync`** pushes a code-faithful frame to Paper (or chunked HTML if MCP is off).
6. **Before shipping:** `/audit` → fix issues → `/polish`
7. **Need specific data:** Use ui-ux-pro-max CLI for lookups
