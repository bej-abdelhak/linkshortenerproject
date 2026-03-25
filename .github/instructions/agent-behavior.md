# Agent Behavior Guidelines

Guidelines for how LLM agents (like GitHub Copilot) should work within this project.

---

## Core Principles

1. **Surgical edits**: Make minimal, focused changes that respect existing code style and intent
2. **Root-cause fixes**: Prefer solving the underlying issue over patching symptoms
3. **Ask only when necessary**: Clarify only when missing information prevents safe progress
4. **Preserve conventions**: Respect existing folder structure, naming patterns, and technology choices

---

## When Starting Multi-Step Tasks

### Use Task Tracking
- Use `manage_todo_list` to plan and track work
- Break tasks into logical, actionable steps
- Mark one task as `in-progress` before starting
- Mark tasks as `completed` immediately after finishing (do not batch completions)

### Provide Visibility
- Give a one-line preamble before batch actions
  - Example: *"Implementing auth protection now."*
- Update todo items as you complete them

---

## Progress Reporting

### After 3–5 Tool Calls
Send a brief progress update that includes:
- **What was done**: Summary of changes
- **Files changed**: List of modified files
- **Next steps**: What comes next

**Example Update**:
```
Created proxy.ts and updated app/layout.tsx with ClerkProvider.
Next: npm install @clerk/nextjs and start dev server.
```

### Before Finishing
- Summarize all changes made
- List which files were created or modified
- Confirm the task is complete
- Suggest next steps if applicable

---

## When Stuck or Unsure

**Do NOT make assumptions:**
- Do not invent configuration details
- Do not assume user preferences
- Do not skip critical context gathering

**Instead:**
1. Describe what you've found so far
2. Identify what information is missing
3. Suggest a reasonable course of action
4. Ask user to confirm before proceeding

**Example**:
> I found the database schema, but I'm unclear whether the `/api/links` endpoint should return paginated results or all links. I can implement either approach. Which would you prefer?

---

## File Editing Rules

### Principle: Surgical, Minimal Changes
- Edit one concern per change
- Include 3–5 lines of surrounding context in edits
- Never bulk-replace or reformat unrelated code
- Use proper diff tools (not terminal commands)

### Validation
- After edits, run appropriate checks:
  - TypeScript: `npm run build`
  - Linting: `npm run lint` (if available)
  - Tests: `npm run test` (if available)
- Report any errors before completing

---

## Research & Exploration

### When Context Gathering
- Parallelize independent read-only operations
- Combine related searches in single requests
- Avoid over-searching (gather context efficiently, then act)
- Use subagents for complex codebase exploration

### Check Documentation First
- ALWAYS read the relevant individual docs in `docs/` before generating any code
- Treat reading the matching instruction files as a mandatory prerequisite to implementation
- If multiple topics are involved, read every relevant file before making code changes
- Look for relevant instruction files (`.instructions.md`)
- Follow established patterns from existing code

---

## Code Quality

### TypeScript & Linting
- All code must pass TypeScript checks (`npm run build`)
- Follow ESLint rules without exceptions
- No `any` types unless documented
- Match existing code style in the file

### Comments
- Explain *why*, not *what* (code already shows what)
- Leave TODOs with context for next steps
- Remove debug code before committing

### Naming Conventions
- React components: `PascalCase`
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: kebab-case (for components, use matching component name in snake-case)

---

## Clerk-Specific Behaviors

### Authentication is Mandatory
- Clerk is the **ONLY** auth method
- No alternative auth systems allowed
- No deprecated Clerk APIs (`SignedIn`, `SignedOut`, `authMiddleware()`, etc.)

### Always Reference Docs
- Check `docs/authentication.md` for Clerk patterns
- Use `auth()` from `@clerk/nextjs/server` for protected routes
- Use `<Show>` component instead of deprecated condition components

### Protected Routes
- `/dashboard` and children require logged-in users
- Use `auth()` check with redirect to `/sign-in` if not authenticated
- Implement in route handler or server component

---

## When a Task Requires Multiple Files

### Step 1: Plan with Todo List
```
1. [ ] Create middleware in proxy.ts
2. [ ] Update app/layout.tsx with ClerkProvider
3. [ ] Add auth check to app/dashboard/page.tsx
4. [ ] Implement homepage redirect in app/page.tsx
5. [ ] Test locally
```

### Step 2: Execute in Order
- Work through one todo at a time
- Mark each as `in-progress`, then `completed`
- Provide updates every 3–5 changes

### Step 3: Validate
- Ensure all changes work together
- Run `npm run build` to check for errors
- Report final status

---

## Communication

### Be Clear & Concise
- Avoid lengthy explanations
- Use bullet points for clarity
- State what was done, not what tools were used

❌ **Avoid**: "I'll use the replace_string_in_file tool to update the authentication logic..."

✅ **Good**: "Updated app/page.tsx to redirect logged-in users to /dashboard"

### Show Code Changes
- Provide relevant code snippets
- Use markdown code blocks with language tags
- Include 3–5 lines of context for clarity

---

## Checklist for Agents

Before finishing any task:
- [ ] All code passes TypeScript checks (`npm run build`)
- [ ] No ESLint errors remain
- [ ] No debug code or console.log() left behind
- [ ] Naming conventions are consistent
- [ ] No `.env*` files were created or modified
- [ ] All required dependencies are installed
- [ ] Dev server starts without warnings (related to changes)
- [ ] Clerk auth follows documented patterns
- [ ] Protected routes have proper auth checks
- [ ] Homepage redirects logged-in users appropriately
- [ ] Code follows existing style of adjacent files

---

## Resources for Agents

- **Project docs**: See `docs/` for authentication, testing, git workflow
- **Clerk docs**: https://clerk.com/docs/nextjs/
- **Next.js docs**: https://nextjs.org/docs
- **TypeScript handbook**: https://www.typescriptlang.org/docs/
