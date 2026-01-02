# Product Workspace

A comprehensive product development workspace with multi-agent collaboration, quality gates, and mobile-first enforcement. Built on Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

> **Looking for a simpler starter?** Check out [prototype-starter](https://github.com/stdemps/prototype-starter) for rapid prototyping without the full product development features.

## Features

### Multi-Agent Collaboration
- **3 Specialized Agents:** Engineer, Designer, and Product Manager perspectives
- **Conversational Skills:** Interactive Q&A with domain experts (`/engineer`, `/designer`, `/pm`)
- **File Review Skills:** Comprehensive document analysis (`/engineer-review`, `/designer-review`, `/prd-review`)
- **Orchestration:** Multi-agent collaboration via `/collab` for synthesized perspectives

### Quality & Enforcement
- **Quality Gates:** Pre-commit hooks for linting, type checking, and mobile-first validation
- **Prototype Mode:** Fast iteration mode that runs checks without blocking commits (`PROTOTYPE_MODE=1`)
- **Type Safety:** TypeScript strict mode enabled
- **Accessibility:** WCAG 2.1 AA guidelines built-in
- **Mobile-First:** Pattern validation for responsive design

### Developer Experience
- **Zero-config Start:** Clone, `npm install`, `npm run dev` → working app
- **Cursor-Ready:** `.cursor/rules/` auto-loaded with UI guidelines and coding standards
- **Quick Start Guide:** [.claude/QUICKSTART.md](.claude/QUICKSTART.md) for 5-minute setup
- **Documentation Structure:** PRD templates, reviewer personas ready to use
- **Dark Mode:** Fully configured and working out of the box

## Quick Start

### Option 1: Use GitHub Template (Recommended)

1. **Click "Use this template"** on GitHub
2. **Create a new repository** from the template
3. **Clone your new repository:**
   ```bash
   git clone https://github.com/yourusername/your-project.git
   cd your-project
   ```

### Option 2: Clone Directly

1. **Clone this repository:**
   ```bash
   git clone https://github.com/stdemps/product-workspace.git my-project
   cd my-project
   ```

### Then Continue:

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the customization script (optional):**
   ```bash
   node template.config.js
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in Cursor:**
   - Open the project in Cursor
   - Drop your PRD into `docs/prds/`
   - Start coding with all context loaded!

## Project Structure

```
workspace-template/
├── .claude/
│   ├── agents/             # Conversational agents
│   │   ├── engineer.js
│   │   └── designer.js
│   ├── skills/             # Functional skills
│   │   ├── engineer-review.js
│   │   ├── designer-review.js
│   │   └── prd-review.js
│   ├── hooks/              # Quality gate hooks
│   │   └── quality-gate.sh
│   └── claude.json         # Claude Code configuration
├── .cursor/
│   └── rules/              # Auto-loaded context (available via @ mentions)
│       ├── ui-design-guidelines.mdc
│       ├── coding-standards.mdc
│       └── project-context.mdc
├── .github/
│   └── repository-template/  # GitHub template configuration
├── docs/
│   ├── prds/               # PRD templates
│   ├── research/           # Research documentation
│   ├── prototypes/         # Design prototypes
│   └── reviewers/          # Reviewer personas
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── topbar.tsx
└── lib/
    └── utils.ts
```

## Multi-Agent Collaboration

This workspace includes specialized agents for comprehensive product development:

### Conversational Agents

- **`/engineer "question"`** - Technical questions, debugging, architecture
- **`/designer "question"`** - UX questions, design guidance, accessibility
- **`/pm "question"`** - Product strategy, prioritization, problem framing
- **`/collab "question"`** - Get all three perspectives + synthesis

### File Review Skills

- **`/engineer-review <file>`** - Technical feasibility and architecture review
- **`/designer-review <file>`** - UX, accessibility, and design review
- **`/prd-review <file>`** - Comprehensive multi-perspective review

### Examples

```bash
# Ask questions to individual agents
/engineer "How should I structure authentication for this Next.js app?"
/designer "What's the best way to show loading states in forms?"
/pm "What's the MVP for user onboarding?"

# Get multi-agent collaboration
/collab "Should I use modals or slide-overs for settings?"
# Returns: Engineer + Designer + PM perspectives + synthesis

# Review files
/prd-review docs/prds/my-feature.md
```

**Getting Started:** See [.claude/QUICKSTART.md](.claude/QUICKSTART.md) for workflows and examples.

**Full Documentation:** [.claude/README.md](.claude/README.md)

## Using Cursor Rules

Files in `.cursor/rules/` are automatically loaded by Cursor and available via @ mentions:

- `@ui-design-guidelines` - UI/UX guidelines, accessibility, mobile responsiveness
- `@coding-standards` - TypeScript, React, and code quality standards
- `@project-context` - Project-specific context (customize this!)

**Example:**
```
@ui-design-guidelines How should I make this component mobile-responsive?
```

## Quality Gates

Pre-commit hooks automatically run:
1. **ESLint** - Code quality checks
2. **TypeScript** - Type checking
3. **Mobile-first validation** - Warns if desktop-first patterns detected in UI files

### Prototype Mode

Use `PROTOTYPE_MODE=1` for rapid iteration:

```bash
# Production mode (strict - commit fails if checks fail)
git commit -m "feat: Add feature"

# Prototype mode (lenient - shows errors but allows commit)
PROTOTYPE_MODE=1 git commit -m "WIP: Prototyping feature"
```

**When to use prototype mode:**
- ✅ Rapid prototyping and experimentation
- ✅ A/B testing for velocity comparison
- ✅ WIP commits during development

**When NOT to use:**
- ❌ Production code
- ❌ Code review submissions
- ❌ Before opening PRs

The quality gate is configured in [.claude/hooks/quality-gate.sh](.claude/hooks/quality-gate.sh).

## Documentation Templates

### PRD Template
Use `docs/prds/template-prd.md` as a starting point for your product requirements documents.

### Reviewer Personas
Use the reviewer personas in `docs/reviewers/` to get multi-perspective feedback:
- `@docs/reviewers/engineer.md` - Technical feasibility
- `@docs/reviewers/designer.md` - UX and design
- `@docs/reviewers/executive.md` - Business and strategy
- `@docs/reviewers/user-researcher.md` - User research and validation

## Customization

### 1. Update Project Context
Edit `.cursor/rules/project-context.mdc` with your project-specific information.

### 2. Customize App Metadata
Update `app/layout.tsx` with your app name and description.

### 3. Add Your PRD
Drop your PRD into `docs/prds/` and reference it with `@docs/prds/your-prd.md`.

### 4. Install Additional Components
Use shadcn/ui CLI to add more components:
```bash
npx shadcn@latest add [component-name]
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **next-themes** - Dark mode support
- **Lucide React** - Icons

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Related Projects

### Product Workspace vs Prototype Starter

This repository (**product-workspace**) is designed for comprehensive product development with:
- Multi-agent collaboration (Engineer, Designer, PM)
- Quality gates with prototype mode
- Extensive documentation and guides
- Mobile-first enforcement

For simpler rapid prototyping without these features, use:
- [**prototype-starter**](https://github.com/stdemps/prototype-starter) - Minimal setup, faster onboarding

**Choose product-workspace when:**
- Building production applications
- Need multi-perspective feedback on decisions
- Want strict quality enforcement with flexible prototype mode
- Working in teams with multiple roles

**Choose prototype-starter when:**
- Quick prototyping and experimentation
- Solo development or small teams
- Don't need agent orchestration
- Want minimal configuration

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Cursor Documentation](https://cursor.sh/docs)
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)

## License

MIT

