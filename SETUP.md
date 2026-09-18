# Setup Guide

Step-by-step instructions to get your workspace up and running.

## Prerequisites

- Node.js 18+ and npm
- Git
- Cursor (recommended) or your preferred editor

## Initial Setup

### 1. Get the Template

**Option A: Use GitHub Template (Recommended)**

1. Click **"Use this template"** button on the GitHub repository page
2. Create a new repository from the template
3. Clone your new repository:
   ```bash
   git clone https://github.com/yourusername/your-project.git
   cd your-project
   ```

**Option B: Clone Directly**

```bash
git clone https://github.com/yourusername/workspace-template.git my-project
cd my-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Customize Project (Optional)

Run the customization script to update project name and metadata:

```bash
node template.config.js
```

This renames the app in `package.json`, `app/layout.tsx`, `app/page.tsx` and
`components/topbar.tsx`. The example tests in `e2e/example.spec.ts` do not look for
a specific app name, so renaming your project will not break them.

Or manually update:
- `package.json` - Project name and version
- `app/layout.tsx` - App metadata
- `.cursor/rules/project-context.mdc` - Project context

### 4. Git Setup

If you used the GitHub template button, git is already initialized. If you cloned directly, you may want to:

```bash
# Update remote to point to your new repository
git remote set-url origin https://github.com/yourusername/your-project.git

# Or initialize a new repository
git init
git add .
git commit -m "Initial commit from workspace template"
```

### 5. Enable the Quality Gate

Git does not share hooks between clones, so enable them once per clone:

```bash
git config core.hooksPath .githooks
```

This runs before each commit and **blocks the commit** if ESLint or the
TypeScript type check fails. It also warns about desktop-first responsive
patterns in staged UI files.

To run the checks without blocking, during rapid prototyping:

```bash
CLAUDE_PROTOTYPE_MODE=true git commit -m "message"
```

To include the Playwright suite in the gate:

```bash
RUN_TESTS=true git commit -m "message"
```

To turn the hook off entirely: `git config --unset core.hooksPath`

> This gate is deliberately strict. If you want checks that warn but never
> block, use the lighter prototyping template instead of loosening this one.

### 6. Download the Test Browsers

The tests drive real browsers, and `npm install` does not download them. Run this
once per machine:

```bash
npx playwright install
```

Skip this and `npm test` fails with "Executable doesn't exist" — that means the
browsers are missing, not that anything is wrong with your code.

Then check it works:

```bash
npm test
```

`npm test` uses Desktop Chrome, which is the quick everyday check. To run every
browser and screen size (slower, worth doing before you share work), use
`npm run test:all` — this needs the download step above to have finished.

### 7. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Enable Playwright MCP (Optional)

This template includes a project-level MCP config so Cursor can use Playwright for browser automation (navigate, click, type, snapshot) when working on the app.

**Config file:** `.cursor/mcp.json` defines the Playwright MCP server. Cursor should pick it up when you open the project.

If the Playwright MCP server doesn’t appear:

1. Open **Cursor → Settings → MCP** (Model Context Protocol).
2. Ensure project MCP is enabled, or add the server manually:
   - **Name:** `playwright`
   - **Command:** `npx`
   - **Args:** `@playwright/mcp@latest`
3. Restart Cursor.

**What it’s for:** The AI can drive the browser (e.g. open your app, take snapshots, fill forms) to verify UI or debug issues. E2E tests themselves still run via `npm test` (Playwright Test); MCP is for interactive use inside Cursor.

For which agents benefit from Playwright MCP and other tools (file read/write, @-mentions), see [docs/agent-tools-and-context.md](docs/agent-tools-and-context.md).

## First Steps

### 1. Update Project Context

Edit `.cursor/rules/project-context.mdc` with your project information:
- Project overview and goals
- Key terminology
- User personas (if applicable)
- Product philosophy

### 2. Add Your PRD

Create or copy your PRD to `docs/prds/`:
```bash
cp your-prd.md docs/prds/
```

Reference it in Cursor with:
```
@docs/prds/your-prd.md
```

### 3. Customize the Home Page

Edit `app/page.tsx` to match your project needs.

### 4. Add Additional Components

Install shadcn/ui components as needed:
```bash
npx shadcn@latest add [component-name]
```

## Security tooling

This template includes security guidance and example workflows:

- **SECURITY.md** (repo root) – Secrets, authentication, input validation, and security practices.
- **.cursor/rules/** – SAST and hardening rules (e.g. `security-sast.mdc`, `security-hardening.mdc`). Use these when configuring Semgrep, CodeQL, or similar in CI.
- **docs/examples/github-actions-sast.yml** – Example workflow to run SAST (e.g. Semgrep) on push/PR. Copy to `.github/workflows/sast.yml` to enable.
- **docs/production-hardening.md** – Checklist for production (headers, TLS, secrets, CI).

Never commit `.env.local` or real secrets; use your platform’s secret manager or CI environment variables for production.

## Environment Variables

Environment variables are things like API keys and database URLs — settings that
differ between your machine and production, and that must never be committed.

This project ships a template listing the ones it knows about. Copy it, then fill
in the values you need:

```bash
cp .env.example .env.local
```

Open `.env.local` and uncomment the lines you want to use. `.env.local` is already
ignored by git, so nothing you put in it gets committed.

## Development Workflow

1. **Write PRD** → Drop into `docs/prds/`
2. **Open in Cursor** → Context auto-loads from `.cursor/rules/`
3. **Reference PRD** → Use `@docs/prds/your-prd.md`
4. **Get Feedback** → Use reviewer personas: `@agents/engineer.md`
5. **Build** → Start coding with all context available!

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors

Ensure all dependencies are installed:
```bash
npm install
```

### Build Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

## Next Steps

- Read the [README.md](./README.md) for more information
- Check out the [PRD template](./docs/prds/template-prd.md)
- Explore the [reviewer personas](./agents/)
- Customize the [UI guidelines](./.cursor/rules/ui-design-guidelines.mdc) if needed

## Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [shadcn/ui Components](https://ui.shadcn.com)
- Consult [Cursor Documentation](https://cursor.sh/docs)

