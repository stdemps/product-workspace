# Claude Extension vs Cursor Chat - Quick Reference

**Test:** Which AI is better in Cursor IDE for prototyping?

---

## ⚡ Setup (2 min)

```bash
# Clone workspace twice
git clone workspace-template claude-extension-test
git clone workspace-template cursor-chat-test

# Install
cd claude-extension-test && npm install && cd ..
cd cursor-chat-test && npm install && cd ..

# Copy logs
cp workspace-template/.claude/ab-testing/TEST-TEMPLATE-claude-extension.md claude-extension-test/test-log.md
cp workspace-template/.claude/ab-testing/TEST-TEMPLATE-cursor-chat.md cursor-chat-test/test-log.md
```

---

## 🔬 Test A: Claude Extension

```bash
cd claude-extension-test
cursor .
```

**Use:**
- Claude chat panel
- Claude code completion
- Your `.claude/` agents (if supported)

**Track:** Everything in `test-log.md`

---

## 🔬 Test B: Cursor Chat

```bash
cd cursor-chat-test
cursor .
```

**Use (DISABLE Claude extension first):**
- `@engineer` (from `.cursor/rules/`)
- `@designer` (from `.cursor/rules/`)
- Cursor autocomplete
- Cursor native chat

**Track:** Everything in `test-log.md`

---

## 🎯 Build This (Same for Both)

**User Authentication Flow:**
- ✅ Signup form (email, password, confirm)
- ✅ Login form (email, password, remember me)
- ✅ Validation logic (8+ chars, uppercase, number, special)
- ✅ Tests
- ✅ TypeScript strict, accessibility, mobile-first, dark mode

---

## 📊 Compare

| Metric | Claude Ext | Cursor Chat | Winner |
|--------|-----------|-------------|--------|
| Time | __ min | __ min | |
| TS errors | __ | __ | |
| ESLint errors | __ | __ | |
| DX (1-10) | __ | __ | |
| Context (1-10) | __ | __ | |

---

## ✅ Decide

**Decision rules:**
- **Better code quality** → Winner (even if slightly slower)
- **20%+ faster** with same quality → Winner
- **Much better DX** with same quality → Winner
- **Tied** → Use whichever felt better

---

## 🎓 Key Questions

**For Claude Extension:**
- Did it understand workspace context?
- Did `.claude/` agents help?
- Code quality on first attempt?

**For Cursor Chat:**
- Did `@engineer` actually work differently than plain chat?
- Did `.cursor/rules/` auto-load effectively?
- Was autocomplete helpful?

---

## 📖 Full Guide

See: `CLAUDE-VS-CURSOR-IN-CURSOR.md`

---

**Goal:** Find which AI setup works best for YOUR prototyping workflow in Cursor IDE.
