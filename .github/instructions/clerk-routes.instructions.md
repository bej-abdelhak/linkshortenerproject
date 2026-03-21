---
description: "Use when implementing or modifying authentication routes, page redirects, or Clerk modals. Covers /dashboard protection, homepage redirect to /dashboard for logged-in users, and modal sign-in/sign-up flows."
applyTo: ["app/page.tsx", "app/dashboard/**", "app/**/route.ts"]
---

# Clerk Authentication Routes

## Core Requirements

**Clerk is the ONLY authentication method.** No alternatives are permitted.

### 1. Sign In & Sign Up Modals
- Use `<SignIn />` and `<SignUp />` components as inline modals
- Do NOT create separate `/sign-in` or `/sign-up` full-page routes
- Render in app layout or via a dedicated modal component
- Example (in layout or component):
  ```tsx
  import { SignIn, SignUp } from "@clerk/nextjs";
  
  // Modal state managed locally or via context
  {showSignIn && <SignIn />}
  {showSignUp && <SignUp />}
  ```

### 2. Dashboard Protection
- **Route**: `/dashboard` (or any child `app/dashboard/**`)
- **Requirement**: User MUST be logged in
- **Implementation**:
  ```tsx
  // app/dashboard/page.tsx
  import { auth } from "@clerk/nextjs/server";
  import { redirect } from "next/navigation";
  
  export default async function DashboardPage() {
    const { userId } = await auth();
    
    if (!userId) {
      redirect("/sign-in"); // or custom sign-in page
    }
    
    return <div>Dashboard content</div>;
  }
  ```

### 3. Homepage Redirect (Logged-In Users)
- **Route**: `/` (app/page.tsx)
- **Behavior**: If user is logged in → redirect to `/dashboard`
- **Implementation**:
  ```tsx
  // app/page.tsx
  import { auth } from "@clerk/nextjs/server";
  import { redirect } from "next/navigation";
  
  export default async function HomePage() {
    const { userId } = await auth();
    
    if (userId) {
      redirect("/dashboard");
    }
    
    return <div>Public homepage for logged-out users</div>;
  }
  ```

## Important Notes

- ✅ Always import from `@clerk/nextjs` (client) or `@clerk/nextjs/server` (server)
- ✅ Use `auth()` helper in server components for route protection
- ✅ Use `redirect()` from `next/navigation` for redirects
- ❌ Do NOT use deprecated Clerk APIs (`withAuth`, `currentUser`, `SignedIn`, `SignedOut`)
- ❌ Do NOT create alternative auth methods (OAuth, JWT, sessions, etc.)
