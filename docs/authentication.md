# Authentication: Clerk (Mandatory)

**Clerk is the ONLY authentication method for this project.** No alternative auth systems (OAuth, JWT custom sessions, etc.) are permitted.

---

## APIs & Imports

### Always Use
- **Server Middleware**: `clerkMiddleware()` from `@clerk/nextjs/server` → placed in `proxy.ts`
- **Client Components**: `ClerkProvider`, `SignInButton`, `SignUpButton`, `UserButton`, `<Show>` from `@clerk/nextjs`
- **Server Code**: `auth()` from `@clerk/nextjs/server` with async/await for protected routes and API endpoints

### Deprecated APIs (Do NOT Use)
- ❌ `authMiddleware()` (replaced by `clerkMiddleware()`)
- ❌ `withAuth` HOC
- ❌ Old `currentUser()` or other deprecated server helpers
- ❌ `<SignedIn>` / `<SignedOut>` components (use `<Show when="signed-in">` / `<Show when="signed-out">` instead)

---

## Middleware Setup

### File: `proxy.ts` (at project root)
```typescript
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect dashboard and API routes
    "/dashboard(.*)",
    "/api(.*)",
    // Skip public routes
    "/((?!_next|sign-in|sign-up|public|.*\\.png|.*\\.svg).*)",
  ],
};
```

---

## Layout & UI Setup

### File: `app/layout.tsx`
Wrap all content with `ClerkProvider` and add auth UI in the header:

```tsx
import { ClerkProvider, SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header>
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

---

## Route Protection & Auth Flows

### Sign In & Sign Up Modals
- ✅ Use `<SignIn />` and `<SignUp />` inline components that display as modal dialogs
- ✅ Render in layout or accessible route component
- ❌ Do NOT create separate `/sign-in` or `/sign-up` full-page route files

### Protected Routes
**`/dashboard` and child routes must require authentication:**
```typescript
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return <div>Dashboard content (protected)</div>;
}
```

### Homepage Redirect
**If user is logged in, redirect to `/dashboard`:**
```typescript
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }
  
  return <div>Public homepage (logged-out users only)</div>;
}
```

---

## Keyless Mode (No Setup Required)

Clerk uses **keyless mode by default** for local development:

- ✅ Default configuration auto-generates temporary keys locally
- ✅ Users do NOT need to create a Clerk account or sign up beforehand
- ✅ Users do NOT need to add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` or `CLERK_SECRET_KEY` to `.env.local` before running
- ✅ A "Configure your application" prompt appears after first signup; users can click it to claim the app later
- ✅ Users can complete entire onboarding (signup, profile) without any account setup

**Bottom line**: No manual Clerk configuration required for local development.

---

## Implementation Checklist

- [ ] `clerkMiddleware()` is used in `proxy.ts` with proper matchers
- [ ] `ClerkProvider` wraps the body in `app/layout.tsx`
- [ ] All Clerk imports are from `@clerk/nextjs` (client) or `@clerk/nextjs/server` (server)
- [ ] No deprecated APIs are used (`authMiddleware`, `SignedIn`, `SignedOut`, `withAuth`, etc.)
- [ ] Auth UI uses `<Show when="signed-in">` and `<Show when="signed-out">`
- [ ] Sign In & Sign Up display as **inline modal components** (not separate route pages)
- [ ] `/dashboard` route is protected with `auth()` check and redirects logged-out users
- [ ] `/` (homepage) redirects logged-in users to `/dashboard`
- [ ] App Router is used (files in `app/`)
- [ ] No `pages/` directory or `_app.tsx` changes were made

---

## Resources

- **Clerk Docs (Next.js)**: https://clerk.com/docs/nextjs/getting-started/quickstart
- **Next.js `auth()` Helper**: https://clerk.com/docs/references/nextjs/auth
- **Clerk Show Component**: https://clerk.com/docs/nextjs/components/show
