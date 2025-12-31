# Quick Start: Claude Code Agents & Skills

Get up and running with Claude Code in 5 minutes.

---

## ⚡ 5-Minute Setup

### 1. Test That It Works (30 seconds)

```bash
# Test conversational agents
/engineer "What's the best way to handle authentication in Next.js?"
/designer "How should the mobile navigation work?"
/pm "What's the MVP for user onboarding?"
```

If these work, you're done! If not, continue below.

---

### 2. Verify Setup (1 minute)

Check that skills are registered:

```bash
# List all available skills
claude-code --list-skills

# You should see:
# - engineer (💬 Conversational)
# - designer (💬 Conversational)
# - pm (💬 Conversational)
# - engineer-review (📄 File Review)
# - designer-review (📄 File Review)
# - prd-review (📄 File Review)
# - collab (🤝 Multi-Agent)
# - init-project (🔧 Utility)
```

---

## 🎯 Common Workflows

### Workflow 1: Planning a New Feature

```bash
# 1. Define the problem and scope
/pm "We want users to customize their dashboard. What's the MVP?"

# 2. Get design perspective
/designer "How should dashboard customization work? Consider mobile users."

# 3. Get technical feasibility
/engineer "Technical approach for saving user dashboard layouts?"

# 4. Or get all perspectives at once
/collab "How should we implement dashboard customization?"
```

---

### Workflow 2: Reviewing a PRD

```bash
# Comprehensive review from all perspectives
/prd-review docs/prds/my-feature.md

# Or get individual perspectives
/engineer-review docs/prds/my-feature.md
/designer-review docs/prds/my-feature.md
```

---

### Workflow 3: Making a Design Decision

```bash
# Get multiple perspectives
/collab "Should I use modals or slide-overs for the settings panel?"

# Follow up with specific questions
/designer "Show me examples of accessible modal implementations"
/engineer "What are the performance implications of modals vs slide-overs?"
```

---

### Workflow 4: Debugging an Issue

```bash
# Get technical help
/engineer "Debug this error: Cannot read property 'map' of undefined in UserList component"

# Follow up
/engineer "Should I add optional chaining or use a loading state?"
```

---

### Workflow 5: Prototyping (Fast Mode)

```bash
# Use prototype mode to bypass quality gates
PROTOTYPE_MODE=1 git commit -m "WIP: Add dashboard customization"

# Still runs checks, shows errors, but allows commit
# Perfect for A/B testing or rapid iteration
```

---

## 📋 Cheat Sheet

### Conversational Agents (Ask Questions)

```bash
/engineer "question"   # Technical/architecture questions
/designer "question"   # UX/design questions
/pm "question"         # Product/prioritization questions
/collab "question"     # All three perspectives + synthesis
```

### File Review Skills (Review Documents)

```bash
/engineer-review <file>   # Technical feasibility
/designer-review <file>   # UX and accessibility
/prd-review <file>        # All four perspectives
```

### Utility Skills

```bash
/init-project             # Initialize new project from template
```

---

## 🚀 Decision Tree: Which Skill to Use?

```
Do you have a specific file to review?
├─ Yes → Use file review skills
│  ├─ Technical focus? → /engineer-review
│  ├─ Design focus? → /designer-review
│  └─ Want all perspectives? → /prd-review
│
└─ No, you have a question → Use conversational agents
   ├─ Technical question? → /engineer
   ├─ Design question? → /designer
   ├─ Product question? → /pm
   └─ Want multiple perspectives? → /collab
```

---

## 🔧 Troubleshooting

### Problem: `/engineer` says "Unknown skill"

**Fix:** Check registration in `.claude/claude.json`:

```json
{
  "skills": {
    "engineer": {
      "path": "./agents/engineer.js",
      "description": "..."
    }
  }
}
```

---

### Problem: Quality gate failing on prototype code

**Fix:** Use prototype mode:

```bash
PROTOTYPE_MODE=1 git commit -m "message"
```

This runs checks but allows commit even if they fail.

**When to use:**
- ✅ Rapid prototyping
- ✅ A/B testing for velocity
- ✅ WIP commits

**When NOT to use:**
- ❌ Production code
- ❌ Code review
- ❌ PR submissions

---

### Problem: Agent response seems generic

**Check:** Is the persona loading correctly?

```bash
# Test directly
node .claude/agents/engineer.js "test"

# Should output the persona first, then your question
```

If persona doesn't show, the agent file may have syntax errors.

---

### Problem: `/collab` is slow

**Expected:** `/collab` runs 3 agents in parallel, takes ~10-15 seconds.

**Tip:** Use individual agents (`/engineer`, `/designer`, `/pm`) when you only need one perspective.

---

## 💡 Pro Tips

### Tip 1: Be Specific in Questions

❌ Bad: `/engineer "How do I do auth?"`
✅ Good: `/engineer "Should I use NextAuth.js or build custom auth with JWT for a B2B SaaS app?"`

### Tip 2: Use `/collab` for Trade-offs

When you need to balance multiple concerns:

```bash
/collab "Should we implement infinite scroll or pagination for the feed?"

# You'll get:
# - Engineer: Technical implementation and performance
# - Designer: User experience and accessibility
# - PM: User behavior and metrics
# - Synthesis: Balanced recommendation
```

### Tip 3: Chain Conversations

```bash
# Start broad
/pm "What's the MVP for user notifications?"

# Then get specific
/designer "Design the notification badge and dropdown"

# Then implementation
/engineer "How should we handle real-time notification updates?"
```

### Tip 4: Use Prototype Mode Strategically

```bash
# During prototyping: lenient
PROTOTYPE_MODE=1 git commit -m "WIP: notification system"

# Before PR: strict
git commit -m "feat: Add notification system"
# Will fail if quality checks don't pass
```

---

## 📊 Usage Examples

### Example 1: Feature Planning

```bash
$ /collab "How should we implement user profiles?"

# Returns:
# Engineer Perspective: Database schema, API design, caching
# Designer Perspective: Profile layout, edit flow, privacy controls
# PM Perspective: MVP scope, success metrics, phasing
# Synthesis: Start with read-only profiles, add editing in v2
```

### Example 2: Code Review

```bash
$ /engineer-review docs/specs/api-design.md

# Returns:
# Technical Feasibility: ✅ Achievable
# Complexity: Medium (2-3 days)
# Risks: Rate limiting needed, consider caching
# Recommendations: Use Redis for caching, add API versioning
```

### Example 3: Quick Question

```bash
$ /designer "Loading state for form submission?"

# Returns:
# - Disable submit button
# - Show spinner inside button
# - Add aria-live announcement
# - Consider skeleton loading for data
```

---

## 🎓 Next Steps

1. **Try each agent** - Get a feel for their perspectives
2. **Review the full guide** - [README.md](README.md)
3. **Check agent definitions** - `agents/*.js` to see personas
4. **Customize for your team** - Edit personas to match your standards

---

## 🤔 Questions?

- **Full documentation:** [.claude/README.md](.claude/README.md)
- **Improvements log:** [.claude/IMPROVEMENTS.md](.claude/IMPROVEMENTS.md)
- **A/B testing:** [.claude/ab-testing/README.md](.claude/ab-testing/README.md)

---

**You're ready!** Start with `/engineer "test"` to verify it's working, then ask your first real question. 🚀
