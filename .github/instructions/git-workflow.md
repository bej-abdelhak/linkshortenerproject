# Git & Commit Workflow

---

## Commit Message Convention

### Format
Use **imperative mood** (present tense, not past):

✅ **Good**:
- `feat: add Clerk authentication to app`
- `fix: redirect logged-in users to dashboard`
- `docs: update README with env var setup`
- `refactor: simplify form validation logic`
- `style: update button component styling`
- `test: add unit tests for auth helper`

❌ **Bad**:
- `Added Clerk authentication` (past tense)
- `Fixed bug on page` (too vague)
- `WIP: stuff` (unclear)
- `asdf` (no description)

### Message Length
- **First line**: Short and descriptive (<50 characters)
- **Body** (optional): Explain *why* the change, not what it does
- **Footer** (optional): Reference issue numbers (e.g., `Closes #123`)

### Commit Types
Prefix commits with a type for clarity:

| Type | When to Use | Example |
|------|-------------|---------|
| `feat:` | New feature | `feat: add link shortening API` |
| `fix:` | Bug fix | `fix: dashboard redirect not working` |
| `docs:` | Documentation only | `docs: update auth guidelines` |
| `refactor:` | Code restructure (no feature change) | `refactor: simplify auth hook` |
| `style:` | Code style/formatting | `style: add spacing to button` |
| `test:` | Add/update tests | `test: add auth middleware tests` |
| `ci:` | CI/CD config | `ci: add GitHub Actions workflow` |
| `chore:` | Dependencies, config | `chore: update Next.js to v14.2` |

### Example Commit
```
feat: protect dashboard with Clerk auth

- Add auth() check to app/dashboard/page.tsx
- Redirect logged-out users to /sign-in
- Update middleware to include /dashboard routes

Closes #42
```

---

## Before Committing

### Checklist
- [ ] Code is complete and tested locally
- [ ] All TypeScript errors resolved (`npm run build` passes)
- [ ] Linting passes (`npm run lint` or ESLint output is clean)
- [ ] No `.env*` files are staged (use `.gitignore`)
- [ ] No debug code, `console.log()`, or commented-out code remains
- [ ] Commit message is clear and follows convention

### Commands to Run
```bash
# Check for TypeScript and lint errors
npm run build

# Run linter (if available)
npm run lint

# Verify what's being committed
git status
git diff --staged

# Commit with a descriptive message
git commit -m "feat: add dashboard protection with Clerk"
```

---

## .gitignore Essentials

Make sure these are in `.gitignore`:

```
node_modules/
.next/
.env
.env.local
.env.*.local
.DS_Store
*.log
dist/
build/
```

**Never commit**:
- 🚫 `.env.local` or any `.env*` file
- 🚫 `node_modules/` directory
- 🚫 `.next/` build folder
- 🚫 Secrets, API keys, or tokens

---

## Git Workflow

### For Small Changes
```bash
# Make changes to files
edit app/page.tsx

# Stage changes
git add app/page.tsx

# Commit
git commit -m "fix: redirect logged-in users to dashboard"

# Push to branch
git push origin feature-branch
```

### For Multiple Files
```bash
# Stage all changes (be sure to check what's staged first)
git status           # Review what changed
git add .            # Stage all changes

# Or stage specific files
git add app/page.tsx components/auth/SignIn.tsx

git commit -m "feat: implement auth redirect logic"
git push origin feature-branch
```

### Checking What Has Changed
```bash
# See status
git status

# See diff of unstaged changes
git diff

# See diff of staged changes
git diff --staged

# See recent commits
git log --oneline -10
```

---

## Branch Naming (Recommended)

Use descriptive branch names:

```
feature/add-clerk-auth
feature/implement-dashboard
fix/redirect-homepage
docs/update-auth-docs
refactor/simplify-auth-logic
```

**Avoid**:
- ❌ `master` (don't work on main branch)
- ❌ `my-changes`, `test123`, `wip` (not descriptive)
- ❌ `main` (don't commit directly)

---

## Common Git Commands

```bash
# Create and switch to a new branch
git checkout -b feature/my-feature

# Stage specific files
git add app/page.tsx lib/utils.ts

# Commit with message
git commit -m "feat: implement feature"

# Push to remote
git push origin feature/my-feature

# View recent commits
git log --oneline

# View changes in a file
git diff app/page.tsx

# Undo unstaged changes in a file
git checkout app/page.tsx

# Undo staged changes
git reset HEAD app/page.tsx

# Revert a commit (creates new commit)
git revert <commit-hash>
```

---

## Pull Requests

When ready to merge:

1. Push your branch: `git push origin feature/my-feature`
2. Create Pull Request on GitHub/GitLab
3. Add description of changes
4. Request review from teammates
5. Wait for CI checks to pass
6. Address feedback and push updates
7. Merge once approved

**PR Description Template**:
```markdown
## Description
Brief description of what this PR does.

## Changes
- Implemented Clerk auth on /dashboard
- Added redirect logic to homepage
- Updated tests for new routes

## Related Issues
Closes #42

## Testing
- Tested locally: npm run dev
- Verified /dashboard protection works
- Checked homepage redirect for logged-in users
```

---

## Checklist

- [ ] Commit messages use imperative mood (Add, Fix, Update, not Added, Fixed, Updated)
- [ ] Messages are descriptive and <50 chars on first line
- [ ] No `.env*` files are staged
- [ ] No debug code or console.log() left behind
- [ ] Build passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Changes are tested locally
- [ ] Branch names are descriptive (feature/*, fix/*, docs/*)
- [ ] PR has clear description before merging
