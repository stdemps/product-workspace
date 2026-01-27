# Ralph Loop Guide for Product Workspace

## What is Ralph Loop?

Ralph Loop (officially: Ralph Wiggum plugin) is a Claude Code plugin that enables autonomous, self-correcting development workflows. It turns a single prompt into a persistent loop where Claude continues working, fixing mistakes, and iterating until it meets your completion criteria.

**Key concept:** You give Claude a task with objective exit conditions (like "all tests pass" or "build succeeds"), and Ralph Loop keeps Claude working autonomously until those conditions are met.

## Why Use Ralph Loop for Production Development?

### Perfect For:
- ✅ **TDD + UI Verification** - Autonomous feature implementation with visual correctness
- ✅ **Quality enforcement** - Won't exit until tests pass AND quality gates satisfied
- ✅ **Multi-agent workflows** - Combine with `/collab` for autonomous multi-perspective development
- ✅ **Production-ready features** - High-quality output with comprehensive testing

### Not Ideal For:
- ❌ **Exploratory work** - Open-ended research or discovery tasks
- ❌ **Subjective decisions** - Tasks requiring human judgment or aesthetic choices
- ❌ **Quick prototypes** - Use simpler starter templates for rapid iteration

## Installation

Ralph Loop is available as an official Claude Code plugin:

```bash
/plugin install ralph-wiggum@claude-plugins-official
```

Once installed, you can use Ralph Loop commands in your Claude Code session.

## How It Works

### The Basic Loop

1. **You provide a task** with clear exit conditions
2. **Claude works on the task** using available tools
3. **When Claude tries to exit**, Ralph Loop checks if exit conditions are met
4. **If not complete**, the prompt is fed back and Claude continues
5. **If complete**, the loop exits successfully

### Safety Mechanisms

**Always use `--max-iterations` as your primary safety mechanism:**

```bash
/ralph-loop "Implement feature X with passing tests" --max-iterations 50
```

This prevents infinite loops and runaway API costs.

### Exit Conditions

Ralph Loop recognizes completion when:
- **Explicit completion signal** - Claude outputs a specific phrase you define
- **Objective criteria met** - Tests pass, build succeeds, quality gates pass
- **Max iterations reached** - Safety limit prevents infinite loops

## Usage Patterns for Production Development

### Pattern 1: TDD + UI Verification (Recommended)

Use the full TDD + UI verification prompt from `prompts/tdd-ralph-loop.md`:

```bash
/ralph-loop "Task: Implement [FEATURE] using strict TDD and UI Verification workflow.

[See prompts/tdd-ralph-loop.md for full prompt template]

You MUST output TDD_UI_WORKFLOW_VERIFIED_AND_COMPLETE_20260109 ONLY when ALL exit conditions are met." --max-iterations 40
```

**Good for:** Production features requiring both functional correctness and visual polish

### Pattern 2: Quality Gate Compliance

```bash
/ralph-loop "Ensure codebase passes all quality gates:
1. Fix all TypeScript errors (tsc --noEmit)
2. Fix all ESLint errors (npm run lint)
3. Ensure mobile-first patterns (quality gate validation)
4. All tests pass (npm test)

Exit only when: All quality gates pass" --max-iterations 25
```

**Good for:** Preparing for production deployment

### Pattern 3: Feature with Multi-Agent Review

```bash
/ralph-loop "Implement [FEATURE] with multi-agent review:
1. Implement feature with TDD workflow
2. Run /collab review for Engineer + Designer + PM feedback
3. Address all feedback from agents
4. Regenerate screenshots showing improvements
5. All tests pass and quality gates satisfied

Exit only when: /collab review shows approval from all agents AND tests pass" --max-iterations 50
```

**Good for:** Complex features benefiting from multiple perspectives

### Pattern 4: Accessibility Compliance

```bash
/ralph-loop "Ensure [COMPONENT/FEATURE] meets WCAG 2.1 AA:
1. Run accessibility tests (Playwright axe integration)
2. Fix contrast ratio issues (4.5:1 normal, 3:1 large text)
3. Add proper ARIA attributes
4. Ensure keyboard navigation works
5. Test with screen reader announcements
6. Generate screenshots showing accessibility improvements

Exit only when: All accessibility tests pass AND screenshots verified" --max-iterations 30
```

**Good for:** Accessibility compliance for production features

### Pattern 5: Responsive Design Implementation

```bash
/ralph-loop "Implement responsive design for [FEATURE]:
1. Create tests for 375px (mobile), 768px (tablet), 1024px (desktop)
2. Implement mobile-first styles
3. Test at each breakpoint (no horizontal scroll)
4. Generate screenshots at all breakpoints
5. Verify mobile-first quality gate passes

Exit only when: Tests pass at all breakpoints AND quality gate approves" --max-iterations 25
```

**Good for:** Ensuring mobile-first compliance

## Best Practices

### 1. Define Clear Exit Conditions

**Good:**
```
Exit only when: All tests pass AND all screenshots have verified_ prefix AND quality gates pass
```

**Bad:**
```
Exit when done
```

### 2. Set Appropriate Max Iterations

| Task Complexity | Recommended Max Iterations |
|----------------|---------------------------|
| Quality gate fixes | 15-20 |
| Single component with tests | 25-35 |
| Feature with TDD + UI verification | 35-50 |
| Complex feature with multi-agent review | 50-75 |

### 3. Use Objective Criteria

Ralph Loop works best with measurable success criteria:
- ✅ Tests passing/failing
- ✅ Build succeeding/failing
- ✅ Quality gates pass/fail
- ✅ Screenshot verification (verified_ prefix)
- ✅ Accessibility scores (Lighthouse, axe)
- ❌ "Looks good"
- ❌ "Code is clean"

### 4. Combine with Quality Gates

This workspace includes quality gates that check:
- ESLint (code quality)
- TypeScript (type safety)
- Mobile-first patterns (responsive design)

Use prototype mode to bypass during development:
```bash
CLAUDE_PROTOTYPE_MODE=true /ralph-loop "[task]" --max-iterations 30
```

Then run final verification with quality gates enabled.

### 5. Monitor Progress

Check on long-running loops periodically:
```bash
/tasks  # View active tasks
```

## Production-Specific Tips

### Tip 1: Start with Quality Gates Off

Develop autonomously in prototype mode, then enforce quality:

```bash
# Development phase
CLAUDE_PROTOTYPE_MODE=true /ralph-loop "Implement [FEATURE] with TDD" --max-iterations 35

# Quality phase
/ralph-loop "Fix all quality gate failures for [FEATURE]" --max-iterations 15
```

### Tip 2: Use Multi-Agent for Complex Features

Let Ralph Loop orchestrate multi-agent collaboration:

```bash
/ralph-loop "Implement [COMPLEX FEATURE]:
1. Initial implementation with Engineer agent guidance
2. Run /collab review for multi-perspective feedback
3. Address Designer feedback (UI/UX improvements)
4. Address PM feedback (product requirements)
5. Re-run /collab until all agents approve
6. All tests pass and quality gates satisfied

Exit when: /collab shows consensus approval AND tests pass" --max-iterations 60
```

### Tip 3: Incremental Screenshot Verification

For large features, verify UI incrementally:

```bash
/ralph-loop "Implement [FEATURE] UI with incremental verification:
Phase 1: Implement mobile view (375px)
- Tests pass for mobile
- Screenshot verified_mobile-*.png exists

Phase 2: Implement tablet view (768px)
- Tests pass for tablet
- Screenshot verified_tablet-*.png exists

Phase 3: Implement desktop view (1024px)
- Tests pass for desktop
- Screenshot verified_desktop-*.png exists

Exit when: All phases complete AND all screenshots verified" --max-iterations 45
```

### Tip 4: Cost Optimization

Ralph Loop for production can be expensive. Optimize costs:

**Start specific:**
```bash
# Narrow scope reduces iterations
/ralph-loop "Fix TypeScript errors in src/components/TaskCard.tsx only" --max-iterations 10
```

**Use lower iterations for exploration:**
```bash
# Try with low limit first
/ralph-loop "[task]" --max-iterations 15
# If incomplete, resume with higher limit
/ralph-loop "[continue previous task]" --max-iterations 30
```

**Leverage prototype mode:**
```bash
# Fast iteration without quality gates
CLAUDE_PROTOTYPE_MODE=true /ralph-loop "[task]" --max-iterations 20
```

## Cost Considerations

Ralph Loop for production features:

**Cost estimation:**
- Simple feature (20 iterations): ~$5-8
- Medium feature (35 iterations): ~$12-18
- Complex feature (50 iterations): ~$20-30
- Multi-agent feature (75 iterations): ~$30-45

**Cost control:**
- Always use `--max-iterations`
- Use prototype mode for faster iteration
- Break large features into smaller tasks
- Monitor `/tasks` to cancel runaway loops

## Troubleshooting

### Loop Exits Before Quality Gates Pass

**Problem:** Completion signal output but quality gates failing

**Solution:**
- Make exit conditions more explicit
- Add "AND quality gates pass" to exit condition
- Use unique completion signal to prevent accidental triggers

### Quality Gate Blocks Progress

**Problem:** Loop stuck on quality gate failures

**Solution:**
```bash
# Bypass temporarily to make progress
CLAUDE_PROTOTYPE_MODE=true /ralph-loop "[task]" --max-iterations 30

# Then fix quality issues separately
/ralph-loop "Fix all quality gate failures" --max-iterations 15
```

### Multi-Agent Review Never Approves

**Problem:** `/collab` keeps finding issues

**Solution:**
- Review agent feedback manually
- Check if requirements are achievable
- Break into smaller incremental tasks
- Use prototype mode to iterate faster

### Screenshots Never Get Verified

**Problem:** Agent regenerates but doesn't verify

**Solution:**
- Make UI criteria more explicit (contrast ratios, breakpoints)
- Provide design mockups for reference
- Specify exact elements to verify in each screenshot
- Use smaller max-iterations and verify manually first

## Integrating with Product Workspace Features

### With Quality Gates

Quality gates are checked by pre-commit hook but can run manually:

```bash
# Check quality gates
./.claude/hooks/quality-gate.sh

# Bypass for prototyping
CLAUDE_PROTOTYPE_MODE=true git commit -m "WIP"
```

Use Ralph Loop to ensure quality compliance:

```bash
/ralph-loop "Ensure [FEATURE] passes quality gates without prototype mode" --max-iterations 20
```

### With Multi-Agent Collaboration

Combine Ralph Loop with `/collab`:

```bash
/collab "Review [FEATURE] implementation"
# Get feedback from Engineer, Designer, PM

# Then use Ralph Loop to address all feedback
/ralph-loop "Address all feedback from /collab review:
[Paste feedback summary]

Exit when: All feedback addressed AND /collab re-review approves" --max-iterations 40
```

### With Testing Infrastructure

This workspace includes Playwright pre-configured:

```bash
# Ralph Loop automatically uses existing test infrastructure
/ralph-loop "See prompts/tdd-ralph-loop.md for full TDD + UI verification workflow" --max-iterations 40
```

## Example Workflows

### Workflow 1: Production Feature (Full Stack)

```bash
# Step 1: Implement with TDD + UI verification
/ralph-loop "[Full TDD + UI verification prompt from prompts/tdd-ralph-loop.md]" --max-iterations 45

# Step 2: Multi-agent review
/collab "Review [FEATURE] for production readiness"

# Step 3: Address feedback (if needed)
/ralph-loop "Address feedback: [paste feedback]" --max-iterations 20

# Step 4: Final quality check
./.claude/hooks/quality-gate.sh
```

### Workflow 2: Bug Fix with Tests

```bash
/ralph-loop "Fix bug [DESCRIPTION]:
1. Write failing test that reproduces bug
2. Fix bug with minimal code changes
3. Ensure all tests pass
4. Verify no regressions

Exit when: Bug test passes AND all other tests pass" --max-iterations 20
```

### Workflow 3: Refactoring with Safety

```bash
/ralph-loop "Refactor [COMPONENT]:
1. Ensure 100% test coverage exists first
2. Refactor code for [GOAL: better performance, cleaner architecture, etc.]
3. All tests still pass
4. TypeScript and ESLint pass
5. Quality gates pass

Exit when: Refactor complete AND all tests pass AND no quality regressions" --max-iterations 30
```

## Resources

- [Full TDD + UI Verification Prompt](../prompts/tdd-ralph-loop.md) - Production-grade autonomous TDD
- [Example E2E Tests](../e2e/README.md) - Test examples with screenshots
- [Quality Gate Hook](../.claude/hooks/quality-gate.sh) - Pre-commit quality enforcement
- [Ralph Loop Official Docs](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md)

## When to Use Simpler Templates Instead

Ralph Loop in this workspace is optimized for **production-quality features**. For rapid prototyping without testing overhead:

**Use simpler templates when:**
- Quick experiments and throwaway code
- Exploring ideas without test coverage
- Need speed over quality
- Solo prototyping without multi-agent review

**Use this workspace when:**
- Building production applications
- Need comprehensive testing
- Want multi-agent collaboration
- Require quality enforcement

---

**Ready for autonomous, production-quality development? Try Ralph Loop with the TDD + UI verification prompt!** 🚀
