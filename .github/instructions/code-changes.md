# Code Changes & Editing

---

## Making Changes

### General Approach
1. Make **minimal, focused changes** that respect existing code style
2. Prefer solving the underlying issue over patching symptoms
3. Write surgical edits using proper tools (not bulk replacements)
4. Include **3–5 lines of surrounding context** in edits to ensure unambiguous replacements

### When Using Tools
- Use file editing tools for precise, targeted changes
- Keep patches **minimal** and **self-contained** per file
- After edits, validate with linting or build commands if available
- Never make unnecessary bulk changes

---

## Code Style & Formatting

### Linting & Prettier
- Follow the project's existing **ESLint** and **Prettier** rules
- Do not introduce new formatting tools or linters without explicit approval
- Match the indentation, naming, and structure of adjacent code

### Type Safety
- Always write TypeScript with proper type annotations
- Avoid `any`; use generics and type inference instead
- Use React TypeScript patterns (e.g., `React.FC<Props>`, typed event handlers)

---

## Naming Conventions

| Type | Convention | Examples |
|------|-----------|----------|
| React Components | PascalCase | `SignInButton`, `DashboardLayout` |
| Files (components) | kebab-case | `sign-in-button.tsx` |
| Variables | camelCase | `userId`, `isLoading`, `formData` |
| Functions | camelCase | `handleSubmit()`, `getUser()`, `formatDate()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL`, `DEFAULT_PAGE_SIZE` |
| Types & Interfaces | PascalCase | `User`, `AuthToken`, `ApiResponse` |
| Folders | kebab-case | `app/sign-in/`, `components/auth/` |

---

## TypeScript & React Patterns

### Server Components (Default)
```tsx
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return <div>Dashboard</div>;
}
```

### Client Components
```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Type Annotations
```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): Promise<User> {
  // ...
}
```

---

## Import Organization

Order imports as follows:
1. External packages (`react`, `next`, `@clerk/nextjs`)
2. Relative imports (`./components`, `../lib`)
3. Type imports (use `type` keyword for types-only)

```tsx
import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

import type { User } from "@/db/schema";
```

---

## Comments & Documentation

### When to Comment
- ✅ Explain *why* (not what the code does)
- ✅ Document non-obvious logic or workarounds
- ✅ Mark TODOs or FIXMEs with context

### Example
```tsx
// ✅ Good: explains the why
// Redirect logged-in users to dashboard to prevent confusion
if (userId) {
  redirect("/dashboard");
}

// ❌ Bad: states the obvious
// Check if userId exists
if (userId) {
```

---

## Error Handling

### Server-Side
```tsx
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);
  
  if (!item) {
    notFound(); // Shows 404
  }
  
  return <div>{item.name}</div>;
}
```

### Client-Side
```tsx
"use client";

import { useState } from "react";

export default function Form() {
  const [error, setError] = useState<string | null>(null);
  
  async function handleSubmit(data: FormData) {
    try {
      const response = await fetch("/api/submit", { method: "POST", body: data });
      if (!response.ok) throw new Error("Submission failed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(new FormData(e.currentTarget)); }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
```

---

## Checklist

- [ ] Code follows project ESLint & Prettier rules
- [ ] TypeScript types are properly annotated
- [ ] React components use `"use client"` when needed
- [ ] Naming conventions: PascalCase (components), camelCase (functions), UPPER_SNAKE_CASE (constants)
- [ ] Imports organized (external, relative, types)
- [ ] Error handling for async operations
- [ ] Comments explain *why*, not *what*
- [ ] No `any` types unless absolutely necessary
- [ ] Code matches style of adjacent files
