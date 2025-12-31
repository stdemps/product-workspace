# A/B Testing Framework - Quick Navigation

## 📚 Documentation

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [README.md](README.md) | Complete framework documentation | 15 min |
| [QUICK-START.md](QUICK-START.md) | Get started in 5 minutes | 5 min |
| [EXAMPLES.md](EXAMPLES.md) | Real-world test examples | 10 min |
| **This file** | Navigation and overview | 2 min |

## 🚀 Quick Start Path

**First time?** Follow this path:

1. **Read:** [QUICK-START.md](QUICK-START.md) (5 min)
2. **Install:** `npm install` (1 min)
3. **Run:** Example test (2 min)
   ```bash
   node compare.js \
     --scenario scenarios/component-gen.yml \
     --variants variants/baseline.yml,variants/concise-rules.yml
   ```
4. **Understand:** Review [EXAMPLES.md](EXAMPLES.md) (10 min)
5. **Create:** Your first custom test (15 min)

## 📂 Directory Structure

```
.claude/ab-testing/
│
├── 📄 Documentation
│   ├── INDEX.md              ← You are here
│   ├── README.md             ← Full framework guide
│   ├── QUICK-START.md        ← 5-minute tutorial
│   └── EXAMPLES.md           ← Real-world examples
│
├── 🔬 Test Scenarios
│   ├── component-gen.yml     ← React component quality test
│   ├── prd-review.yml        ← PRD review quality test
│   └── api-route-quality.yml ← API route quality test
│
├── 🎛️ Configuration Variants
│   ├── baseline.yml          ← Control (current setup)
│   ├── backend-specialist.yml ← +Backend agent
│   └── concise-rules.yml     ← Shorter Cursor rules
│
├── 📊 Test Results
│   ├── results/              ← Test outputs (gitignored)
│   └── .gitkeep
│
├── 📖 References
│   └── ideal-prd-review.md   ← Reference ideal output
│
├── 🛠️ Tools
│   ├── compare.js            ← Main test runner
│   └── package.json          ← Dependencies
│
└── 📝 Config
    └── .gitignore            ← Ignore results
```

## 🎯 Common Use Cases

### Use Case 1: "Claude Extension vs Cursor Chat - which is better in Cursor?"

**Manual test:** Build the same prototype twice in Cursor IDE, once with Claude extension, once with native Cursor chat.

```bash
# See the complete guide
cat CLAUDE-VS-CURSOR-IN-CURSOR.md
```

**Decision:** Use whichever produces better code quality and developer experience

---

### Use Case 2: "Should I add this agent?"

```bash
# Test if new agent improves output quality
node compare.js \
  --scenario scenarios/api-route-quality.yml \
  --variants variants/baseline.yml,variants/backend-specialist.yml
```

**Decision:** Adopt if improvement > 10%

---

### Use Case 3: "Are my rules too long?"

```bash
# Test if concise rules maintain quality
node compare.js \
  --suite all \
  --variants variants/baseline.yml,variants/concise-rules.yml
```

**Decision:** Adopt if speed ↑30% and quality ↓<5%

---

### Use Case 4: "Does this hook help?"

```bash
# Test if quality gate catches more issues
node compare.js \
  --scenario scenarios/component-gen.yml \
  --variants variants/baseline.yml,variants/auto-gates.yml
```

**Decision:** Adopt if error detection ↑>50%

## 🔧 Available Scenarios

| Scenario | Tests | Good For |
|----------|-------|----------|
| `component-gen.yml` | React component quality | Testing UI-related changes |
| `prd-review.yml` | Agent response quality | Testing agent improvements |
| `api-route-quality.yml` | API code quality | Testing backend-related changes |

**Create your own:** Copy and modify an existing scenario in `scenarios/`

## 🎛️ Available Variants

| Variant | Changes | Purpose |
|---------|---------|---------|
| `baseline.yml` | None (control) | Comparison baseline |
| `backend-specialist.yml` | +Backend agent | Test dedicated API expert |
| `concise-rules.yml` | Shorter Cursor rules | Test if brevity helps |

**Create your own:** Copy `baseline.yml` and modify one aspect

## 📊 Understanding Results

Results include:

```json
{
  "winner": "variants/backend-specialist.yml",
  "improvement": "+15.2%",
  "variants": {
    "baseline": {
      "score": 7.5,
      "metrics": { ... },
      "pass": true
    },
    "backend-specialist": {
      "score": 8.7,
      "metrics": { ... },
      "pass": true
    }
  }
}
```

### Decision Framework

| Improvement | Action |
|-------------|--------|
| < 5% | ❌ Reject - not worth it |
| 5-10% | ⚠️ Conditional - only if zero downsides |
| 10-20% | ✅ Adopt - strong candidate |
| > 20% | ✅✅ Adopt immediately |

## 🎓 Learning Resources

### For Beginners

1. Start with [QUICK-START.md](QUICK-START.md)
2. Run the example test
3. Read one example from [EXAMPLES.md](EXAMPLES.md)
4. Modify an existing scenario
5. Create your own test

### For Advanced Users

1. Read [README.md](README.md) for full details
2. Study all scenarios in `scenarios/`
3. Create complex multi-metric tests
4. Integrate with CI/CD
5. Build custom evaluation scripts

## 💡 Pro Tips

### Tip 1: Run Multiple Iterations
LLMs vary. Run 3-5 times and average:

```bash
for i in {1..5}; do
  node compare.js -s scenarios/test.yml -v baseline,variant -o results/run-$i.json
done
```

### Tip 2: Test Real Scenarios
Don't test "create a button." Test actual features you'll build:

✅ Good: "Create a multi-step checkout form with validation"
❌ Bad: "Create a button component"

### Tip 3: Change One Thing
Test one variable at a time:

✅ Good: Test adding backend agent only
❌ Bad: Test backend agent + new rules + different hooks

### Tip 4: Document Your Hypothesis
Always write down what you expect and why:

```yaml
metadata:
  hypothesis: "Backend agent will improve API security by 15%"
  expected_outcome: "More security issues caught, better validation"
```

### Tip 5: Set Decision Criteria Upfront
Decide the threshold before testing:

```yaml
metadata:
  decision_criteria:
    adopt_if: "Security score improves >15% AND time <10% slower"
    reject_if: "No improvement OR significantly slower"
```

## 🤝 Contributing

Found a useful scenario or variant? Add it to the repository:

1. Create your scenario in `scenarios/`
2. Test it works
3. Document the purpose
4. Commit and share

## 📞 Need Help?

- **Setup issues:** See [QUICK-START.md](QUICK-START.md#troubleshooting)
- **Framework questions:** See [README.md](README.md)
- **Examples:** See [EXAMPLES.md](EXAMPLES.md)

## 🎯 Next Steps

**Right now, you should:**

1. [ ] Install dependencies: `npm install`
2. [ ] Run first test: See [QUICK-START.md](QUICK-START.md)
3. [ ] Review examples: See [EXAMPLES.md](EXAMPLES.md)
4. [ ] Create your test: Modify a scenario
5. [ ] Make a decision: Use the framework

**Happy testing! 🧪**

---

_Last updated: 2025-01-15_
