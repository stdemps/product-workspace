# A/B Testing Framework for Workspace Templates

This framework helps you compare different workspace template configurations to determine which setup produces better outcomes.

## Overview

Unlike traditional A/B testing (which measures user behavior), workspace template A/B testing compares:
- **Agent response quality** - Which template produces more useful agent outputs?
- **Development velocity** - Which setup helps developers work faster?
- **Code quality** - Which configuration produces better code?
- **Context effectiveness** - Which Cursor rules provide more relevant context?

## Structure

```
.claude/ab-testing/
├── README.md              # This file
├── scenarios/             # Test scenarios
│   ├── prd-review.yml     # PRD review comparison
│   ├── component-gen.yml  # Component generation comparison
│   └── refactor.yml       # Code refactoring comparison
├── variants/              # Template variants to test
│   ├── variant-a.yml      # Baseline configuration
│   └── variant-b.yml      # Experimental configuration
├── results/               # Test results (gitignored)
└── compare.js             # Comparison runner script
```

## Quick Start

### 1. Define Test Scenarios

Create test scenarios in `scenarios/`:

```bash
# Example: Compare PRD review quality
node compare.js --scenario prd-review --variants variant-a,variant-b
```

### 2. Analyze Results

Results are saved in `results/` with timestamps. Use the built-in comparison report:

```bash
# Generate comparison report
node compare.js --report results/2025-01-15-prd-review.json
```

## Test Scenario Types

### 1. **Agent Response Quality**
Measure agent output quality across identical prompts.

**Metrics:**
- Response relevance (1-10)
- Completeness (% of requirements addressed)
- Actionability (concrete vs. vague)
- Time to response

**Example scenarios:**
- PRD review consistency
- Design feedback depth
- Code review thoroughness

### 2. **Code Generation Quality**

Compare code generated with different template configurations.

**Metrics:**
- Type safety (TypeScript errors: 0 = best)
- Accessibility score (A11y violations)
- Mobile-first compliance
- Code duplication
- Lines of code (brevity)

**Example scenarios:**
- Generate authentication component
- Create API route with validation
- Build responsive layout

### 3. **Context Effectiveness**

Measure how well Cursor rules provide relevant context.

**Metrics:**
- Context retrieval accuracy
- Response time with context
- Unnecessary context loaded (%)

**Example scenarios:**
- Ask design question (should load UI guidelines)
- Ask API question (should load coding standards)
- Ask business question (should load project context)

### 4. **Development Velocity**

Measure time-to-completion for common tasks.

**Metrics:**
- Time to complete task
- Number of iterations required
- Number of errors encountered

**Example scenarios:**
- Implement feature from PRD
- Fix reported bug
- Add new component

## Defining Variants

Variants represent different workspace template configurations. Define them in `variants/`:

```yaml
# variants/variant-a.yml
name: "Baseline Configuration"
description: "Current workspace template setup"

cursor_rules:
  - ui-design-guidelines.mdc
  - coding-standards.mdc
  - project-context.mdc

claude_agents:
  - engineer.js
  - designer.js

claude_skills:
  - engineer-review.js
  - designer-review.js
  - prd-review.js

hooks:
  - quality-gate.sh

settings:
  auto_context: true
  mobile_first_validation: true
```

```yaml
# variants/variant-b.yml
name: "Experimental: Separate Backend Agent"
description: "Test adding dedicated backend reviewer agent"

cursor_rules:
  - ui-design-guidelines.mdc
  - coding-standards.mdc
  - backend-standards.mdc  # NEW
  - project-context.mdc

claude_agents:
  - engineer.js
  - designer.js
  - backend.js  # NEW

claude_skills:
  - engineer-review.js
  - designer-review.js
  - backend-review.js  # NEW
  - prd-review.js

hooks:
  - quality-gate.sh
  - api-validation.sh  # NEW
```

## Defining Scenarios

Scenarios are test cases that run against each variant:

```yaml
# scenarios/component-gen.yml
name: "Component Generation Quality"
description: "Compare quality of generated React components"

type: code_generation

prompt: |
  Create a LoginForm component with:
  - Email and password inputs
  - Remember me checkbox
  - Submit button with loading state
  - Error message display
  - Full accessibility (WCAG 2.1 AA)
  - Mobile-responsive (mobile-first)
  - Dark mode support

evaluation:
  metrics:
    - name: typescript_errors
      command: "npx tsc --noEmit"
      weight: 0.3

    - name: accessibility
      command: "npx @axe-core/cli components/login-form.tsx"
      weight: 0.3

    - name: mobile_first
      script: "check-mobile-first.js"
      weight: 0.2

    - name: lines_of_code
      script: "count-loc.js"
      weight: 0.1
      inverse: true  # Lower is better

    - name: code_quality
      command: "npx eslint components/login-form.tsx --format json"
      weight: 0.1

expected_output:
  files:
    - components/login-form.tsx
    - components/__tests__/login-form.test.tsx

pass_criteria:
  typescript_errors: 0
  accessibility_violations: 0
  mobile_first_score: ">= 8"
```

## Running Comparisons

### Single Scenario

```bash
# Compare two variants on one scenario
node compare.js \
  --scenario scenarios/component-gen.yml \
  --variants variants/variant-a.yml,variants/variant-b.yml \
  --output results/component-gen-$(date +%Y-%m-%d).json
```

### Multiple Scenarios (Suite)

```bash
# Run full test suite
node compare.js \
  --suite all \
  --variants variants/variant-a.yml,variants/variant-b.yml \
  --output results/full-suite-$(date +%Y-%m-%d).json
```

### Batch Testing

```bash
# Test all variants against all scenarios
node compare.js \
  --batch \
  --output results/batch-$(date +%Y-%m-%d)/
```

## Interpreting Results

Results are saved as JSON with this structure:

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "scenario": "component-gen",
  "variants": {
    "variant-a": {
      "score": 8.7,
      "metrics": {
        "typescript_errors": 0,
        "accessibility_violations": 0,
        "mobile_first_score": 9,
        "lines_of_code": 120,
        "eslint_errors": 0
      },
      "time_seconds": 45,
      "pass": true
    },
    "variant-b": {
      "score": 9.2,
      "metrics": {
        "typescript_errors": 0,
        "accessibility_violations": 0,
        "mobile_first_score": 10,
        "lines_of_code": 95,
        "eslint_errors": 0
      },
      "time_seconds": 42,
      "pass": true
    }
  },
  "winner": "variant-b",
  "improvement": "+5.7%"
}
```

### Generate Report

```bash
# Human-readable comparison report
node compare.js --report results/component-gen-2025-01-15.json

# Output:
# ✓ Component Generation Quality
#
# Winner: Variant B (+5.7%)
#
# Metrics Comparison:
# ├─ TypeScript Errors:     0 vs 0 (tied)
# ├─ Accessibility:         0 vs 0 (tied)
# ├─ Mobile-First Score:    10 vs 9 (+11%)
# ├─ Lines of Code:         95 vs 120 (-21%)
# └─ ESLint Errors:         0 vs 0 (tied)
#
# Time: 42s vs 45s (-6.7%)
#
# Recommendation: Variant B produced more concise code with
# better mobile-first adherence in less time.
```

## Best Practices

### 1. Use Realistic Scenarios
Don't test toy examples. Use actual features you plan to build.

### 2. Test Multiple Dimensions
Don't optimize for just one metric. Balance quality, speed, and developer experience.

### 3. Run Multiple Times
Run each test 3-5 times to account for LLM variability.

### 4. Document Variants
Clearly describe what changed between variants and why.

### 5. Track Over Time
Keep historical results to see if improvements stick.

### 6. Small Changes
Test one change at a time. Don't compare wildly different setups.

## Example Use Cases

### Use Case 1: Should I add a backend-specific agent?

**Hypothesis:** Adding a dedicated backend reviewer will improve API code quality.

**Test:**
```bash
# Create variant-backend.yml with new backend agent
# Run API-focused scenarios
node compare.js \
  --scenario scenarios/api-review.yml \
  --variants variants/baseline.yml,variants/variant-backend.yml
```

**Decision criteria:** If backend variant scores >10% higher on API scenarios with no regression on other scenarios, adopt it.

---

### Use Case 2: Are my Cursor rules too verbose?

**Hypothesis:** Shorter Cursor rules will load faster without sacrificing quality.

**Test:**
```bash
# Create variant-concise-rules.yml with condensed rules
# Run context effectiveness scenarios
node compare.js \
  --scenario scenarios/context-load-time.yml \
  --variants variants/baseline.yml,variants/variant-concise.yml
```

**Decision criteria:** If concise rules are >20% faster with <5% quality drop, adopt them.

---

### Use Case 3: Should I auto-run quality gates on save?

**Hypothesis:** Running quality gates on save will catch errors earlier but may slow development.

**Test:**
```bash
# Create variant-auto-gates.yml with auto-run enabled
# Run development velocity scenarios
node compare.js \
  --scenario scenarios/feature-implementation.yml \
  --variants variants/baseline.yml,variants/variant-auto-gates.yml
```

**Decision criteria:** If auto-gates variant finds >30% more errors early with <15% time increase, adopt it.

## Advanced: CI/CD Integration

Run A/B tests in CI to validate template changes before merging:

```yaml
# .github/workflows/template-ab-test.yml
name: Template A/B Test

on:
  pull_request:
    paths:
      - '.claude/**'
      - '.cursor/**'
      - 'agents/**'

jobs:
  ab-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run A/B test suite
        run: |
          node .claude/ab-testing/compare.js \
            --suite critical \
            --variants variants/main.yml,variants/pr.yml \
            --output results/pr-${{ github.event.pull_request.number }}.json

      - name: Post results
        uses: actions/github-script@v6
        with:
          script: |
            const results = require('./results/pr-${{ github.event.pull_request.number }}.json')
            // Post results as PR comment
```

## Metrics Reference

### Code Quality Metrics
- `typescript_errors`: TypeScript type errors (0 = best)
- `eslint_errors`: ESLint violations (0 = best)
- `accessibility_violations`: A11y issues (0 = best)
- `mobile_first_score`: Mobile-first compliance (0-10, 10 = best)
- `lines_of_code`: Code brevity (lower = better)
- `cyclomatic_complexity`: Code complexity (lower = better)
- `test_coverage`: Test coverage % (higher = better)

### Agent Quality Metrics
- `relevance_score`: How relevant the response is (0-10)
- `completeness_score`: % of requirements addressed (0-100)
- `actionability_score`: Concrete vs vague advice (0-10)
- `accuracy_score`: Factual accuracy (0-10)

### Performance Metrics
- `time_seconds`: Total time to completion
- `iterations`: Number of tries needed
- `context_load_time_ms`: Time to load Cursor context
- `tokens_used`: LLM tokens consumed

## Troubleshooting

### "Variant not found"
Ensure variant YAML files exist in `variants/` directory.

### "Scenario failed to run"
Check that all commands in scenario are available on your system.

### "Inconsistent results"
LLMs have inherent variability. Run tests multiple times and average results.

### "Metrics script failed"
Ensure metric evaluation scripts have execute permissions and dependencies installed.

## Further Reading

- [Agent Comparison Guide](../../.claude/AGENT-COMPARISON.md)
- [Cursor Rules Documentation](.cursor/rules/README.md)
- [Claude Code Skills](../../.claude/README.md)

---

**Remember:** The goal isn't to find "the best" configuration universally, but to find the best configuration *for your team and use cases*.
