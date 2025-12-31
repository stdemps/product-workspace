# Cursor vs Claude Code - Quick Reference

**Goal:** Find which tool is better for prototyping

---

## ⚡ Quick Setup (5 minutes)

```bash
# Clone twice
git clone workspace-template cursor-test
git clone workspace-template claude-code-test

# Setup both
cd cursor-test && npm install && cd ..
cd claude-code-test && npm install && cd ..

# Copy test logs
cp workspace-template/.claude/ab-testing/TEST-TEMPLATE-cursor.md cursor-test/test-log.md
cp workspace-template/.claude/ab-testing/TEST-TEMPLATE-claude-code.md claude-code-test/test-log.md
```

---

## 🎯 The Task

Build a user authentication flow:
- ✅ Signup form (email, password, confirm)
- ✅ Login form (email, password, remember me)
- ✅ Validation (8+ chars, uppercase, number, special)
- ✅ Tests
- ✅ Accessibility + Mobile-first + Dark mode

---

## 🔬 Test A: Cursor

```bash
cd cursor-test
cursor .
```

**Use:**
- `@engineer` for technical help
- `@designer` for UX help
- Cursor autocomplete
- Cursor chat

**Track in:** `test-log.md`

---

## 🔬 Test B: Claude Code

```bash
cd claude-code-test
code .  # or your editor
```

**Use:**
- `/engineer "question"`
- `/designer "question"`
- `claude-code chat`
- `/engineer-review file.tsx`

**Track in:** `test-log.md`

---

## 📊 Compare

| Metric | Cursor | Claude Code |
|--------|--------|-------------|
| Time | __ min | __ min |
| Quality | __/10 | __/10 |
| Experience | __/10 | __/10 |

---

## ✅ Decide

| Time Diff | Quality Diff | Decision |
|-----------|--------------|----------|
| >20% faster | Same | ✅ Use faster |
| >10% faster | Same | ✅ Use faster |
| Similar | Better quality | ✅ Use higher quality |
| Similar | Similar | ⚖️ Personal preference |

---

## 🎓 Tips

✅ **Do:**
- Track everything
- Same task for both
- Be honest about time

❌ **Don't:**
- Rush the test
- Skip tracking
- Test different features

---

## 📖 Full Guide

See [CURSOR-VS-CLAUDE-GUIDE.md](CURSOR-VS-CLAUDE-GUIDE.md) for detailed instructions.
