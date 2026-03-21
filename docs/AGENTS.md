# LLM Agent Instructions — Capilot Link Shortener

**Purpose**: Authoritative coding standards and guidelines for LLM agents and developer assistants working on this repository.

**Last Updated**: March 21, 2026

---

## 🎯 Quick Start for Agents

This project uses **Next.js 14+ (App Router)**, **TypeScript**, and **Clerk for authentication** (mandatory, no exceptions).

### Mandatory First Step
- **Before generating any code, ALWAYS read the relevant individual instruction files in `docs/` for the task at hand**
- Treat the matching file guidance as required context, not optional reference material
- If a task touches multiple areas, read each relevant file before making code changes

### Core Principles
- **Surgical edits**: Make minimal, focused changes that respect existing code style
- **Root-cause fixes**: Solve underlying issues, not symptoms
- **Ask when unsure**: Clarify rather than assume
- **Preserve conventions**: Respect existing patterns and structure

---

## 📚 Documentation Index

Detailed guidelines are organized in **separate files** for easier reference and updates:

### Foundations
| Topic | File | Coverage |
|-------|------|----------|
| **Clerk Authentication** | [docs/authentication.md](authentication.md) | Clerk APIs, keyless mode, protected routes, modal setup, route redirects |
| **Code Structure** | [docs/code-structure.md](code-structure.md) | Next.js App Router, folder layout, naming conventions, file organization |
| **UI Components** | [docs/ui.md](ui.md) | shadcn/ui required, component patterns, adding new components, customization |
| **Environment & Secrets** | [docs/environment.md](environment.md) | `.env` files, secrets management, local dev, production setup |

### Workflows & Best Practices
| Topic | File | Coverage |
|-------|------|----------|
| **Code Changes** | [docs/code-changes.md](code-changes.md) | How to edit files, style guidelines, TypeScript patterns, imports |
| **Testing & Dev** | [docs/testing.md](testing.md) | Local setup, running dev server, testing Clerk, debugging |
| **Git & Commits** | [docs/git-workflow.md](git-workflow.md) | Commit messages, branch naming, PR workflow, `.gitignore` |
| **Agent Behavior** | [docs/agent-behavior.md](agent-behavior.md) | How agents should work, task tracking, progress reporting, research |

---

## 🔐 Critical Rules (No Exceptions)

### Documentation First
✅ **Read the relevant `docs/*.md` instruction files BEFORE generating any code**
- Authentication work: read [docs/authentication.md](authentication.md)
- UI work: read [docs/ui.md](ui.md)
- Code structure work: read [docs/code-structure.md](code-structure.md)
- Editing/style work: read [docs/code-changes.md](code-changes.md)
- Testing/validation work: read [docs/testing.md](testing.md)
- Agent workflow work: read [docs/agent-behavior.md](agent-behavior.md)
- Git workflow work: read [docs/git-workflow.md](git-workflow.md)
- Environment/secrets work: read [docs/environment.md](environment.md)
- If a change spans multiple concerns, read every relevant file before writing code

### Authentication
✅ **Clerk is the ONLY auth method** — Follow [docs/authentication.md](authentication.md)
- Use `clerkMiddleware()` in `proxy.ts`
- Use `auth()` from `@clerk/nextjs/server` for protected routes
- Use `<Show>` component (not deprecated `<SignedIn>` / `<SignedOut>`)
- Sign In & Sign Up render as **inline modal components**
- `/dashboard` requires authentication (redirect logged-out users to `/sign-in`)
- `/` (homepage) redirects logged-in users to `/dashboard`

### Framework
✅ **Next.js 14+ App Router ONLY** — Follow [docs/code-structure.md](code-structure.md)
- Use `app/` directory (not `pages/`)
- No `_app.tsx`, no legacy patterns
- TypeScript required for all code

### UI Components
✅ **shadcn/ui ONLY** — Follow [docs/ui.md](ui.md)
- All UI elements use shadcn/ui components from `components/ui/`
- No custom components (even for "simple" cases)
- Extend via variant props and Tailwind CSS
- Add new components via `npx shadcn-ui@latest add <component>`

### Secrets
✅ **Never commit secrets** — Follow [docs/environment.md](environment.md)
- Local dev uses Clerk keyless mode (no env vars needed)
- `.env.local` and `.env.*` are gitignored
- Create `.env.example` with placeholders only

---

## 🚀 Common Tasks

### Implementing Authentication Flow
→ Read [docs/authentication.md](authentication.md) before generating code

Covers:
- Setting up `proxy.ts` with `clerkMiddleware()`
- Wrapping app with `ClerkProvider` in `app/layout.tsx`
- Creating protected routes (check `auth()` and redirect)
- Modal sign-in/sign-up components
- Protecting `/dashboard` and redirecting from homepage

### Creating or Updating UI Components
→ Read [docs/ui.md](ui.md) before generating code

Covers:
- Using shadcn/ui components from `components/ui/`
- Importing and composing components
- Extending components via variant props and Tailwind CSS
- Adding new components via shadcn CLI
- Common UI patterns (forms, cards, dialogs)

### Starting Multi-Step Work
→ Read [docs/agent-behavior.md](agent-behavior.md) before generating code

Covers:
- Using `manage_todo_list` to track progress
- Providing visibility with brief preambles
- Progress updates (what, files, next)
- When to ask for clarification

### Writing & Editing Code
→ Read [docs/code-changes.md](code-changes.md) before generating code

Covers:
- Making surgical edits with context
- TypeScript type safety patterns
- Naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
- Import organization, comments, error handling

### Testing Changes Locally
→ Read [docs/testing.md](testing.md) before running validation work

Covers:
- Installing and running dev server
- Testing Clerk integration end-to-end
- Debugging common issues
- Building for production

### Committing & Pushing
→ Read [docs/git-workflow.md](git-workflow.md) before preparing commits or PRs

Covers:
- Commit message format (feat:, fix:, docs:, etc.)
- Branch naming (feature/*, fix/*)
- Checking before commit (build, lint, .env)
- PR workflow

---

## 📋 Quick Checklists

### After Implementing Clerk Routes
- [ ] `clerkMiddleware()` in `proxy.ts` with correct matcher
- [ ] `ClerkProvider` wraps body in `app/layout.tsx`
- [ ] All imports from `@clerk/nextjs` or `@clerk/nextjs/server`
- [ ] No deprecated APIs used (no `SignedIn`, `SignedOut`, `authMiddleware`, `withAuth`)
- [ ] `<Show when="signed-in">` and `<Show when="signed-out">` used for conditionals
- [ ] `/dashboard` protected with `auth()` check + redirect to `/sign-in`
- [ ] `/` redirects logged-in users to `/dashboard`
- [ ] Sign In/Sign Up display as inline modals (not separate pages)

### Before Finishing Any Task
- [ ] Code compiles: `npm run build` ✅
- [ ] No ESLint errors: `npm run lint` ✅
- [ ] Tested: `npm run dev` + browser check ✅
- [ ] No `.env*` files staged
- [ ] Commit messages follow convention (feat:, fix:, etc.)
- [ ] Code matches existing style in the file

---

## 📖 Resources

- **Clerk Next.js Docs**: https://clerk.com/docs/nextjs/getting-started/quickstart
- **Next.js App Router**: https://nextjs.org/docs/app
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

## 📝 How to Update Guidelines

- **For Clerk/auth rules**: Update [docs/authentication.md](authentication.md)
- **For code style/structure**: Update [docs/code-changes.md](code-changes.md) or [docs/code-structure.md](code-structure.md)
- **For agent behavior**: Update [docs/agent-behavior.md](agent-behavior.md)
- **For secrets/env**: Update [docs/environment.md](environment.md)
- **For testing**: Update [docs/testing.md](testing.md)
- **For git/commits**: Update [docs/git-workflow.md](git-workflow.md)

Keep guidelines **in sync** with actual project code and team workflows.

---

*Maintained by the development team. Last synced: March 21, 2026.*
