# A/B Testing: Claude Extension vs Cursor Chat

Test which AI assistant works better for prototyping in Cursor IDE.

---

## What This Tests

**Environment:** Cursor IDE (both tests)

**Test A:** Claude Extension
- Uses Claude AI through the extension
- Your `.claude/` agent setup

**Test B:** Cursor Native Chat
- Uses Cursor's built-in AI
- Your `.cursor/rules/` agent setup (`@engineer`, `@designer`)

**Goal:** Find which produces better code quality and developer experience

---

## Quick Start

### 1. Setup (2 minutes)

```bash
# Clone workspace twice
git clone /Users/stevendempsterair/Documents/GitHub/workspace-template claude-extension-test
git clone /Users/stevendempsterair/Documents/GitHub/workspace-template cursor-chat-test

# Install dependencies
cd claude-extension-test && npm install && cd ..
cd cursor-chat-test && npm install && cd ..

# Copy test templates
cp workspace-template/.claude/ab-testing/TEST-TEMPLATE-claude-extension.md claude-extension-test/test-log.md
cp workspace-template/.claude/ab-testing/TEST-TEMPLATE-cursor-chat.md cursor-chat-test/test-log.md
```

### 2. Run Test A - Claude Extension (1-2 hours)

```bash
cd claude-extension-test
cursor .
```

- Use Claude extension only
- Build the authentication flow
- Track everything in `test-log.md`

### 3. Run Test B - Cursor Chat (1-2 hours)

```bash
cd cursor-chat-test
cursor .
```

- **Disable Claude extension**
- Use `@engineer`, `@designer`, Cursor chat
- Build the same authentication flow
- Track everything in `test-log.md`

### 4. Compare Results

Open both `test-log.md` files and compare:
- Time to completion
- TypeScript/ESLint errors
- Code quality
- Developer experience

---

## What to Build (Same for Both)

**User Authentication Flow:**

1. **Signup form** - Email, password, confirm password
2. **Login form** - Email, password, remember me checkbox
3. **Validation logic** - Password requirements, email validation
4. **Tests** - Unit tests for validation
5. **Quality** - TypeScript strict, accessibility, mobile-first, dark mode

---

## Decision Framework

| Scenario | Decision |
|----------|----------|
| One is **>20% faster** with same quality | ✅ Clear winner |
| One has **significantly better code** | ✅ Use higher quality |
| One has **much better DX** | ✅ Use better experience |
| **Very close** results | ⚖️ Use whichever felt better |

---

## Files in This Directory

- **[CLAUDE-VS-CURSOR-IN-CURSOR.md](CLAUDE-VS-CURSOR-IN-CURSOR.md)** - Complete testing guide
- **[CLAUDE-VS-CURSOR-QUICK-REF.md](CLAUDE-VS-CURSOR-QUICK-REF.md)** - One-page quick reference
- **[TEST-TEMPLATE-claude-extension.md](TEST-TEMPLATE-claude-extension.md)** - Test log for Claude
- **[TEST-TEMPLATE-cursor-chat.md](TEST-TEMPLATE-cursor-chat.md)** - Test log for Cursor
- **results/** - Your test results (gitignored)
- **archive/** - Automated testing framework (optional, for advanced users)

---

## What You'll Learn

This test will tell you:

1. ✅ **Which AI produces better code quality?**
2. ✅ **Which AI understands your workspace context better?**
3. ✅ **Which has better developer experience?**
4. ✅ **Is your dual setup (`.claude/` + `.cursor/`) worth maintaining?**
5. ✅ **Should you invest in one system or both?**

---

## Expected Time

- **Setup:** 5 minutes
- **Test A:** 1-2 hours
- **Test B:** 1-2 hours
- **Comparison:** 15 minutes
- **Total:** ~4 hours (can split across days)

---

## Tips for Success

### Do ✅

- Use the **same task** for both tests
- **Track everything** in the test logs
- Be **honest** about iterations and frustrations
- Run tests on **different days** if you get tired

### Don't ❌

- Don't mix tools during a single test
- Don't skip tracking details
- Don't test when rushed
- Don't cherry-pick results

---

## After the Test

### Document Your Winner

Create a summary:

```markdown
# My Test Results

**Winner:** [Claude Extension / Cursor Chat / Tied]

**Why:**
- [Reason 1]
- [Reason 2]

**What I'll do:**
- [Your decision]
```

### Update Your Workflow

Based on results:

- **If Claude wins:** Focus on improving `.claude/` agents
- **If Cursor wins:** Optimize `.cursor/rules/`
- **If tied:** Use both strategically

---

## Advanced: Automated Testing Framework

The `archive/` folder contains an automated A/B testing framework for testing:
- Different agent configurations
- Cursor rule variations
- Quality gate effectiveness
- Code generation metrics

This is for advanced users who want to test workspace configuration changes automatically. Most users won't need this.

---

## Need Help?

See the complete guide: [CLAUDE-VS-CURSOR-IN-CURSOR.md](CLAUDE-VS-CURSOR-IN-CURSOR.md)

---

**Ready to start?** Follow the Quick Start steps above! 🚀
