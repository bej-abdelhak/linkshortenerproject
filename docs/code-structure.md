# Code Structure & Locations

---

## Framework & Language

- **Framework**: Next.js 14+ with App Router (`app/` directory)
- **Language**: TypeScript
- **Package Manager**: npm
- **Entry Points**: Only use `app/` folder (NOT `pages/` router)

### Do NOT Use
- ❌ Pages Router (`pages/` directory)
- ❌ `_app.tsx` or `_document.tsx` (legacy patterns)
- ❌ Relative imports that cross folder boundaries without proper setup

---

## Preferred Folder Layout

```
project-root/
├── app/
│   ├── layout.tsx           (ClerkProvider wraps body)
│   ├── page.tsx             (homepage with redirect logic)
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx         (protected route)
│   │   └── ...
│   ├── api/
│   │   ├── auth/
│   │   ├── [resource]/
│   │   └── ...
│   └── (other routes)
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── modal.tsx
│   │   └── ...
│   ├── auth/
│   │   ├── SignInModal.tsx
│   │   ├── SignUpModal.tsx
│   │   └── ...
│   └── ...
├── db/
│   ├── schema.ts            (Drizzle schema)
│   ├── index.ts             (DB client/connection)
│   └── ...
├── lib/
│   ├── utils.ts
│   ├── hooks.ts
│   └── ...
├── public/
│   ├── images/
│   ├── icons/
│   └── ...
├── proxy.ts                 (clerkMiddleware)
├── package.json
├── tsconfig.json
├── next.config.ts
├── drizzle.config.ts        (if using Drizzle ORM)
├── .env.local               (gitignored)
├── .env.example
├── .gitignore
├── README.md
└── docs/
    └── AGENTS.md            (this file)
```

---

## If Using `src/` Folder

Some projects place everything under `src/`:

```
project-root/
├── src/
│   ├── app/                 (Next.js app router)
│   ├── components/
│   ├── db/
│   ├── lib/
│   ├── proxy.ts             (clerkMiddleware here)
│   └── ...
├── package.json
├── tsconfig.json
├── .env.local
└── ...
```

**If using `src/`**: Move `proxy.ts` inside `src/` instead of root.

---

## Key File Locations

| File | Location | Purpose |
|------|----------|---------|
| Middleware | `proxy.ts` (root or `src/`) | Clerk middleware setup |
| Root Layout | `app/layout.tsx` | ClerkProvider, global styles, header |
| Homepage | `app/page.tsx` | Public page + redirect logic for logged-in users |
| Dashboard | `app/dashboard/page.tsx` | Protected route (requires `auth()` check) |
| Components | `components/` | Reusable UI components |
| Database | `db/` | Schema, migrations, ORM setup |
| Utilities | `lib/` | Helper functions, custom hooks |
| Public Assets | `public/` | Static files (images, favicon, etc.) |

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files | kebab-case | `sign-in-button.tsx` |
| Folders | kebab-case | `app/dashboard/` |
| Components | PascalCase | `SignInButton.tsx` |
| Variables | camelCase | `userId`, `isLoading` |
| Functions | camelCase | `getUser()`, `handleSubmit()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| Types | PascalCase | `User`, `AuthContext` |

---

## Checklist

- [ ] Only `app/` directory used (no `pages/`)
- [ ] No `_app.tsx` or ancient patterns
- [ ] `proxy.ts` at root (or in `src/` if using `src/` folder)
- [ ] `app/layout.tsx` has ClerkProvider wrapper
- [ ] Components follow PascalCase naming
- [ ] Variables and functions use camelCase
- [ ] Constants use UPPER_SNAKE_CASE
