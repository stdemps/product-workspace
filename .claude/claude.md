1. First think through the problem, read the codebase for relevant files.
2. Before you make any major changes, check in with me and I will verify the plan.
3. Please every step of the way just give me a high level explanation of what changes you made
4. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
5. Maintain a documentation file that describes how the architecture of the app works inside and out.
6. Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are certain of the correct answer - give grounded and hallucination-free answers.

## Project Documentation

- **Read `CURRENT-WORK.md` at the start of every session.** It tracks the active feature, branch, and what's in progress. Update it as you go.
- **Read `DESIGN_SYSTEM.md` before making any UI changes.** It defines colour tokens, button rules, form conventions, and anti-patterns. If a section is blank, ask the user whether to fill it in based on what you're building.
- **Read `ARCHITECTURE.md` before making structural changes.** It describes routes, data flow, and key components. Update it when you add new routes, data sources, or major components.

## Development Workflows

- **TDD + UI Verification**: See `e2e/README.md` and `screenshots/README.md` for the test-driven development workflow with visual verification.