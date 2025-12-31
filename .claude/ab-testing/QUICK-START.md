# Quick Start: A/B Testing Your Workspace Template

This guide will walk you through running your first A/B test in 5 minutes.

## Prerequisites

```bash
# Install dependencies
npm install js-yaml

# Make the script executable
chmod +x .claude/ab-testing/compare.js
```

## Step 1: Choose What to Test

Let's say you want to test whether adding a dedicated backend agent improves API code quality.

**Hypothesis:** A specialized backend reviewer will catch more API security issues and provide better validation guidance.

## Step 2: Run Your First Test

```bash
cd .claude/ab-testing

# Test component generation with two variants
node compare.js \
  --scenario scenarios/component-gen.yml \
  --variants variants/baseline.yml,variants/backend-specialist.yml \
  --output results/my-first-test.json
```

## Step 3: Read the Results

The output will show:

```
🧪 Running A/B Test

Scenario: scenarios/component-gen.yml
Variants: variants/baseline.yml, variants/backend-specialist.yml

📋 Scenario: Component Generation Quality
   Compare quality of generated React components

🔬 Testing: Baseline Configuration
   Current workspace template setup (control group)
   Applying configuration: Baseline Configuration
   Executing scenario...
   Evaluating: typescript_score...
   Evaluating: accessibility_score...

   Score: 8.50/10
   Time: 5s
   Status: ✅ PASS

🔬 Testing: Backend Specialist Configuration
   Add dedicated backend/API agent for better API code quality
   Applying configuration: Backend Specialist Configuration
   Executing scenario...
   Evaluating: typescript_score...
   Evaluating: accessibility_score...

   Score: 8.70/10
   Time: 5s
   Status: ✅ PASS

============================================================
📊 COMPARISON RESULTS
============================================================

Scenario: Component Generation Quality
Winner: variants/backend-specialist.yml (+2.4%)

Metrics Comparison:
  typescript_score:
    🏆 variants/backend-specialist.yml: 10.00
       variants/baseline.yml: 10.00
  accessibility_score:
    🏆 variants/backend-specialist.yml: 9.00
       variants/baseline.yml: 8.00

============================================================

💾 Results saved to: results/my-first-test.json
```

## Step 4: Make a Decision

Based on the results:

- **Backend Specialist won by 2.4%**
- Improvement came from better accessibility scoring
- Both had perfect TypeScript scores

**Decision:** The improvement is marginal (<5%). The baseline is good enough. Don't add complexity unless the improvement is >10%.

## Common Testing Scenarios

### Test 1: Should I add a new agent?

```bash
# Compare baseline vs variant with new agent
node compare.js \
  --scenario scenarios/api-route-quality.yml \
  --variants variants/baseline.yml,variants/backend-specialist.yml
```

**Decision criteria:** Adopt if improvement >10% with no regressions.

---

### Test 2: Are my Cursor rules too long?

```bash
# Compare baseline vs concise rules
node compare.js \
  --scenario scenarios/component-gen.yml \
  --variants variants/baseline.yml,variants/concise-rules.yml
```

**Decision criteria:** Adopt if context load time improves >20% and quality drops <5%.

---

### Test 3: Run full test suite

```bash
# Test all scenarios
node compare.js \
  --suite all \
  --variants variants/baseline.yml,variants/backend-specialist.yml \
  --output results/full-suite-$(date +%Y-%m-%d).json
```

**Decision criteria:** Adopt if variant wins >60% of scenarios.

## Creating Your Own Test

### 1. Create a Variant

```yaml
# variants/my-experiment.yml
name: "My Experimental Setup"
description: "Testing a new configuration"

cursor_rules:
  - path: .cursor/rules/ui-design-guidelines.mdc
    enabled: true
  # ... add your changes here

metadata:
  hypothesis: "Adding X will improve Y"
  changes:
    - "Added new rule for Z"
    - "Modified agent prompt for W"
```

### 2. Create a Scenario (optional)

```yaml
# scenarios/my-test.yml
name: "My Custom Test"
description: "Test my specific use case"

type: code_generation

prompt: |
  Create a component that does X, Y, Z

evaluation:
  metrics:
    - name: my_metric
      command: "wc -l < output.tsx"
      weight: 1.0
      inverse: true  # Lower is better

pass_criteria:
  my_metric: "<= 100"
```

### 3. Run the Test

```bash
node compare.js \
  --scenario scenarios/my-test.yml \
  --variants variants/baseline.yml,variants/my-experiment.yml
```

## Best Practices

### 1. Test One Change at a Time

❌ Bad:
```yaml
# Too many changes at once
changes:
  - "Added backend agent"
  - "Modified all Cursor rules"
  - "Changed hook configuration"
  - "Updated Claude settings"
```

✅ Good:
```yaml
# One focused change
changes:
  - "Added backend agent for API reviews"
```

### 2. Run Multiple Iterations

LLMs have variability. Run tests 3-5 times:

```bash
# Run 5 times and average
for i in {1..5}; do
  node compare.js \
    -s scenarios/component-gen.yml \
    -v variants/baseline.yml,variants/test.yml \
    -o results/run-$i.json
done

# Then manually average the results
```

### 3. Use Realistic Scenarios

Test real features you plan to build, not toy examples:

❌ Bad: "Create a button component"
✅ Good: "Create a multi-step form with validation, accessibility, and error handling"

### 4. Set Clear Decision Criteria

Before testing, decide your threshold:

```yaml
metadata:
  hypothesis: "Backend agent improves API security"
  decision_criteria:
    adopt_if: "Security score improves >15%"
    reject_if: "Time increases >20%"
```

## Troubleshooting

### "Cannot find module 'js-yaml'"

```bash
npm install js-yaml
```

### "No metrics defined for scenario"

Your scenario YAML is missing the `evaluation` section. Add:

```yaml
evaluation:
  metrics:
    - name: example_metric
      command: "echo 8"
      weight: 1.0
```

### "Using stub implementation"

The script is running in stub mode. To integrate with real Claude Code:

1. Update `executeScenario()` to actually call Claude Code
2. Update `applyVariantConfig()` to actually switch configurations

See the implementation notes in [compare.js](./compare.js).

## Next Steps

1. **Read the full guide:** [README.md](./README.md)
2. **Review example scenarios:** [scenarios/](./scenarios/)
3. **Create your own variants:** [variants/](./variants/)
4. **Integrate with CI/CD:** See README for GitHub Actions example

---

**Remember:** A/B testing is about making data-driven decisions. Don't adopt changes based on gut feel - run the tests!
