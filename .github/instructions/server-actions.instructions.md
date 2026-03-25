---
description: Use when implementing or modifying data mutations, server actions, or database operations. Enforces server action conventions including file naming, colocation, TypeScript typing, Zod validation, auth checks, and data helper usage.
applyTo: "**"
---

# Server Actions

## Rules

- ALL data mutations must be done via **server actions** — no API routes for mutations
- Server actions must be **called from client components** only
- Server action files must be named **`actions.ts`** and colocated in the same directory as the component that calls them

## TypeScript

- ALL data passed to server actions must have **explicit TypeScript types**
- **Never use `FormData`** as a parameter type — define typed input objects instead

## Return Values

- Server actions must **never throw errors**
- Always return a typed result object with either a `success` or `error` property:
  ```ts
  return { success: true }
  return { error: "Something went wrong" }
  ```

## Validation

- ALL inputs must be validated using **Zod** before any processing

## Authentication

- ALL server actions must **check for a logged-in user first** (via Clerk `auth()`) before proceeding with any database operations
- If no user is found, return `{ error: "Unauthorized" }` immediately

## Database Access

- Database operations must go through **helper functions** located in the `/data` directory
- Server actions must **NOT** call Drizzle queries directly — use the `/data` helpers instead

## Example Structure

```
app/
  dashboard/
    components/
      create-link-form.tsx   ← client component
      actions.ts             ← server actions for this component
data/
  links.ts                   ← drizzle query helpers
```
