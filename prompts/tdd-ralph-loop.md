# TDD + UI Verification with Ralph Loop

Autonomous feature implementation using Test-Driven Development with visual UI verification, optimized for Ralph Loop workflows.

---

## What This Prompt Does

This prompt enables **autonomous, self-correcting feature development** with:
1. **TDD workflow** - Write tests → Implement code → Pass tests
2. **Screenshot verification** - Generate and verify UI correctness visually
3. **Double-loop safety** - Prevents premature exits with file rename constraint
4. **Objective completion** - Clear, measurable exit criteria

**Perfect for:** Production-quality features requiring both functional correctness and visual polish.

---

## Prerequisites

**Required:**
- Playwright installed (`@playwright/test` in package.json)
- `e2e/` directory for tests
- `screenshots/` directory for visual verification
- Ralph Loop plugin: `/plugin install ralph-wiggum@claude-plugins-official`

**Recommended:**
- Max iterations: 30-50 (depending on feature complexity)
- Cost estimate: $10-25 for medium features

---

## The Prompt

```
Task: Implement [INSERT FEATURE NAME HERE] using strict TDD and UI Verification workflow.

## Completion Promise

You MUST output the phrase "TDD_UI_WORKFLOW_VERIFIED_AND_COMPLETE_20260109" ONLY when ALL exit conditions below are met. Do NOT output this phrase under any other circumstances.

## Workflow Steps

### 1. Test-Driven Development (TDD) Setup

**Step A: Write Tests First**
- Create test file in `e2e/[feature-name].spec.ts`
- Write specific tests defining expected behavior
- Include tests for:
  - Functional behavior (user interactions, data flow)
  - Accessibility (keyboard nav, ARIA attributes, screen readers)
  - Responsive design (375px mobile, 768px tablet, 1024px desktop)
- Ensure tests initially FAIL (red phase)

**Step B: Implement Feature**
- Write minimum code required to pass functional tests
- Follow workspace standards:
  - TypeScript strict mode
  - shadcn/ui components
  - WCAG 2.1 AA compliance
  - Mobile-first responsive design
- Run tests until all pass (green phase)

**Step C: Generate Screenshots**
- Configure Playwright to generate screenshots during tests
- Screenshot naming convention: `screenshots/[feature]-[state].png`
- Capture key states:
  - Default/initial render
  - User interaction states (hover, focus, active)
  - Mobile (375px), tablet (768px), desktop (1024px) views
  - Light and dark mode (if applicable)

### 2. Screenshot Verification Protocol

**Review Process:**
Once tests pass, visually analyze EVERY screenshot in `screenshots/` directory for:

**UI Correctness Criteria:**
- ✅ **Accessibility**: WCAG 2.1 AA contrast ratios (4.5:1 normal text, 3:1 large text)
- ✅ **Responsive Design**: No horizontal scroll, proper layout at each breakpoint
- ✅ **Component Styling**: shadcn/ui components render correctly, no visual glitches
- ✅ **Alignment**: Elements properly aligned, consistent spacing
- ✅ **Typography**: Readable, proper hierarchy, no overflow
- ✅ **Color Scheme**: Theme colors applied correctly, dark mode works

**The Rename Rule:**
- IF screenshot shows correct UI implementation → Rename file with `verified_` prefix
  ```bash
  mv screenshots/feature-name.png screenshots/verified_feature-name.png
  ```
- IF screenshot shows UI errors → Fix CSS/code, regenerate screenshot, review again
- DO NOT rename until screenshot is genuinely correct

### 3. The "Double Loop" Constraint (CRITICAL)

**Constraint:** You are FORBIDDEN from outputting the completion phrase in the same iteration where you rename any files.

**Logic:**
- IF you renamed files in current iteration → Loop MUST restart (do not exit)
- In next iteration → Verify ALL files in `screenshots/` have `verified_` prefix
- ONLY if all prefixed AND no renames occurred this iteration → May exit

**Why this matters:** Prevents premature completion where agent renames files but doesn't verify them in separate pass.

## Exit Conditions

You may ONLY output "TDD_UI_WORKFLOW_VERIFIED_AND_COMPLETE_20260109" when ALL of these are true:

1. ✅ All functional tests pass (`npm test` shows 0 failures)
2. ✅ Every file in `screenshots/` directory has `verified_` prefix
3. ✅ No files were renamed in current iteration (double-loop satisfied)
4. ✅ TypeScript compilation succeeds (`tsc --noEmit`)
5. ✅ ESLint shows no errors (`npm run lint`)

## Error Recovery

**If Playwright fails:**
- Check playwright.config.ts exists
- Verify dev server starts on expected port
- Install browsers: `npx playwright install`

**If tests hang:**
- Check for infinite loops in test code
- Verify timeouts configured (default: 30s per test)
- Use `--debug` flag to step through tests

**If screenshots don't generate:**
- Verify `screenshots/` directory exists
- Check file permissions
- Ensure `page.screenshot()` called in test code

**If max iterations reached:**
- Review test failures for root cause
- Simplify feature scope
- Break into smaller sub-features

## Feature Requirements Template

When using this prompt, specify:

**Feature:** [Brief description]

**Functional requirements:**
- [List expected behaviors]
- [User interactions]
- [Data validation rules]

**Accessibility requirements:**
- Keyboard navigation pattern
- ARIA attributes needed
- Screen reader announcements

**Responsive requirements:**
- Mobile layout (375px)
- Tablet layout (768px)
- Desktop layout (1024px)

**Visual requirements:**
- Color scheme (light/dark mode)
- Component library (shadcn/ui)
- Animation/transitions (if any)
```

---

## Example Usage

### Example 1: Simple Component

```bash
/ralph-loop "Task: Implement Task Card component using strict TDD and UI Verification workflow.

## Feature Requirements

**Feature:** Task Card component displaying task information with delete functionality

**Functional requirements:**
- Display task title, description, status badge
- Show delete button that calls onDelete callback
- Support completed/pending status with visual differentiation
- Handle empty description gracefully

**Accessibility requirements:**
- Keyboard navigation: Tab to delete button, Enter/Space to activate
- ARIA label on delete button: \"Delete task [title]\"
- Status badge has aria-label: \"Status: completed\" or \"Status: pending\"
- Proper focus indicators

**Responsive requirements:**
- Mobile (375px): Stack elements vertically, full-width button
- Tablet (768px): Inline layout, button on right
- Desktop (1024px): Same as tablet with more spacing

**Visual requirements:**
- Use shadcn/ui Card, Button, Badge components
- Light/dark mode support
- Hover state on delete button (destructive variant)
- Smooth transitions

You MUST output \"TDD_UI_WORKFLOW_VERIFIED_AND_COMPLETE_20260109\" ONLY when ALL exit conditions are met." --max-iterations 35
```

### Example 2: Complex Feature

```bash
/ralph-loop "Task: Implement User Authentication Form using strict TDD and UI Verification workflow.

## Feature Requirements

**Feature:** Login/signup form with email validation and error handling

**Functional requirements:**
- Email and password input fields with validation
- Toggle between login/signup modes
- Submit button disabled until valid
- Display error messages inline
- Loading state during submission
- Success state after submission

**Accessibility requirements:**
- Form labels associated with inputs
- Error messages announced to screen readers (aria-live)
- Password toggle button with accessible name
- Focus management (errors focus first invalid field)

**Responsive requirements:**
- Mobile (375px): Full-width inputs, stacked layout
- Tablet (768px): Same as mobile
- Desktop (1024px): Centered form with max-width 400px

**Visual requirements:**
- Use shadcn/ui Form, Input, Button components
- Error state: red border, error message below input
- Success state: green checkmark, success message
- Loading state: spinner in button, button disabled
- Light/dark mode support

You MUST output \"TDD_UI_WORKFLOW_VERIFIED_AND_COMPLETE_20260109\" ONLY when ALL exit conditions are met." --max-iterations 45
```

---

## Best Practices

### 1. Start with Clear Requirements
- Define all functional behaviors upfront
- Specify accessibility patterns
- Document responsive breakpoints
- Clarify visual design expectations

### 2. Write Comprehensive Tests
- Cover happy path and edge cases
- Include accessibility tests
- Test all responsive breakpoints
- Verify error states

### 3. Objective UI Criteria
- Use measurable standards (contrast ratios, breakpoints)
- Test with actual tools (axe, Lighthouse)
- Compare against design system (shadcn/ui docs)

### 4. Screenshot Organization
- Clear naming convention
- One state per screenshot
- Group related screenshots (mobile-*, tablet-*, desktop-*)

### 5. Cost Management
- Use `--max-iterations` for safety
- Start with smaller features to estimate costs
- Monitor `/tasks` to check progress
- Cancel with `/cancel-ralph` if stuck

---

## Comparison with Simplified TDD Prompt

| Feature | Simplified TDD (minimal setup) | Full TDD + Ralph Loop (this workspace) |
|---------|-----------------------------------|-------------------------------------------|
| **Framework** | Any (bring your own) | Playwright required |
| **Screenshots** | Optional suggestion | Mandatory with verification |
| **Autonomy** | Manual iteration | Ralph Loop autonomous |
| **Exit Criteria** | User judgment | Objective (tests + screenshots) |
| **Quality** | Guidance | Enforced |
| **Use Case** | Rapid prototyping | Production features |

---

## Troubleshooting

### Loop Exits Too Early

**Symptom:** Completion phrase output before all screenshots verified

**Cause:** Agent bypassed double-loop constraint

**Fix:**
- Emphasize completion phrase uniqueness
- Restate exit conditions at end of prompt
- Use more iterations to allow thorough verification

### Loop Never Exits

**Symptom:** Max iterations reached without completion

**Cause:** Tests keep failing or screenshots never satisfy criteria

**Fix:**
- Review test failures manually
- Check if UI criteria are too strict/vague
- Simplify feature scope
- Break into multiple prompts

### Screenshots Look Correct But Aren't Renamed

**Symptom:** Screenshots appear in `screenshots/` but no `verified_` prefix

**Cause:** Agent unsure if screenshots meet criteria

**Fix:**
- Make UI correctness criteria more explicit
- Provide design mockups for reference
- List specific elements to verify in each screenshot

---

## Related Resources

- [Ralph Loop Guide](../docs/ralph-loop-guide.md) - General Ralph Loop patterns
- [Playwright Documentation](https://playwright.dev) - Official Playwright docs
- [Testing Prompts](./testing.md) - Other testing patterns
- [Example E2E Tests](../e2e/README.md) - Test examples in this repo

---

**Ready to ship production-quality features autonomously? Try this prompt with Ralph Loop!** 🚀
