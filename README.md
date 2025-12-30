# Workspace Template

A reusable workspace template for rapid prototyping with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Pre-configured with Cursor rules, Claude Code skills, documentation templates, and full dark mode support.

## Features

- **Zero-config start:** Clone, `npm install`, `npm run dev` → working app
- **Claude Code skills:** Built-in agent skills for PRD review, technical analysis, and design feedback
- **Cursor-ready:** `.cursor/rules/` auto-loaded with UI guidelines and coding standards
- **Quality gates:** Pre-commit hooks for linting, type checking, and mobile-first validation
- **Documentation structure:** PRD templates, reviewer personas ready to use
- **Dark mode:** Fully configured and working out of the box
- **Type-safe:** TypeScript strict mode enabled
- **Accessible:** WCAG 2.1 AA guidelines built-in
- **Mobile-first:** Responsive patterns documented and ready

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
   git clone https://github.com/yourusername/workspace-template.git my-project
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

## Claude Code Integration

This template includes both agents and skills for Claude Code:

- **Agents** - Conversational personas for interactive questions
- **Skills** - Functional tasks like file reviews and automation

### Agents (Conversational)

- **`/engineer "question"`** - Ask technical questions, debug, discuss architecture
- **`/designer "question"`** - Ask UX questions, get design guidance, accessibility advice

### Skills (Functional)

- **`/engineer-review <file>`** - Technical feasibility and architecture review
- **`/designer-review <file>`** - UX, accessibility, and design review
- **`/prd-review <file>`** - Comprehensive review from all four perspectives

### Examples

```bash
# Ask questions
/engineer "How should I structure authentication for this Next.js app?"
/designer "What's the best way to show loading states in forms?"

# Review files
/engineer-review docs/prds/my-feature.md
/designer-review docs/prds/my-feature.md
/prd-review docs/prds/my-feature.md
```

See [.claude/README.md](.claude/README.md) for complete documentation.

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

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Cursor Documentation](https://cursor.sh/docs)

## License

MIT

