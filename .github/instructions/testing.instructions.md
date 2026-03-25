# Testing & Local Development

---

## Installation & Setup

### Install Dependencies
```bash
npm install
```

This installs all packages from `package.json`, including:
- Next.js 14+ with App Router
- Clerk authentication
- Database ORM (Drizzle or similar)
- UI libraries and utilities

---

## Running Locally

### Start Development Server
```bash
npm run dev
```

This starts the Next.js dev server (typically at `http://localhost:3000`).

The server includes:
- Fast refresh for code changes
- Built-in TypeScript checking
- Middleware (Clerk) processing

### Open in Browser
Visit `http://localhost:3000` and test the app.

---

## Testing Clerk Integration

### Step-by-Step Verification

1. **Open the app**: `http://localhost:3000`
2. **Verify public homepage**: Should see public content for logged-out users
3. **Click "Sign Up"**: Modal should appear (inline modal, not a separate page)
4. **Fill out the form**: 
   - No Clerk account setup needed (keyless mode)
   - No API keys required
5. **Submit**: User account created locally
6. **Profile icon appears**: Header should show `<UserButton />` after signup
7. **Check dashboard**: 
   - Logged-in users can access `/dashboard`
   - If you visited `/dashboard` before signing in, page should now load
8. **Test homepage redirect**: 
   - Click logo or visit `/` while logged in
   - Should redirect to `/dashboard` automatically
9. **Sign out**: Click profile icon → "Sign out"
   - User logged out, homepage shows again
   - `/dashboard` should be inaccessible (redirects to sign-in)

### No Manual Configuration
- ✅ Keyless mode handles everything
- ✅ No need to create Clerk account
- ✅ No API keys to copy
- ✅ If "Configure your application" prompt appears, user can click it later

---

## Building for Production

### Build the App
```bash
npm run build
```

This:
- TypeScript type checks
- Runs ESLint (if configured)
- Builds optimized Next.js bundles
- Verifies all routes are valid

### Start Production Build Locally
```bash
npm run start
```

Runs the optimized build locally. Should behave identically to dev server.

---

## Debugging

### Check Logs
When running `npm run dev`, look at terminal output for:
- TypeScript errors (red text)
- ESLint warnings (yellow text)
- Clerk middleware errors
- Network/API errors

### Use Browser DevTools
1. Open developer tools (F12 or Cmd+Shift+I)
2. Check **Console** tab for JavaScript errors
3. Check **Network** tab for failed API calls
4. Check **Application** tab for cookies/localStorage (Clerk session data)

### Common Issues

| Issue | Solution |
|-------|----------|
| `/dashboard` not loading when logged in | Verify `auth()` check is not always redirecting; check terminal logs for middleware errors |
| Sign In modal not appearing | Ensure `ClerkProvider` wraps layout; check `<Show>` component is used, not deprecated `<SignedIn>` |
| Homepage not redirecting to `/dashboard` | Verify `app/page.tsx` has `auth()` check and `redirect("/dashboard")` for logged-in users |
| Keycloak errors on startup | Clerk keyless mode may need fresh start; try `npm run dev` again |
| Styling not loading | Verify Next.js CSS imports in layout; check for CSS module conflicts |

---

## Environment Variables

For local development:
- **Clerk in keyless mode**: No env vars needed
- **Custom env vars**: Create `.env.local` in project root

Example `.env.local`:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Then restart dev server.

---

## Checklist

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts server at `http://localhost:3000`
- [ ] Public homepage loads for logged-out users
- [ ] Sign In/Sign Up modal displays (not separate page)
- [ ] Sign up creates account without Clerk setup
- [ ] Logged-in users see profile icon in header
- [ ] `/dashboard` loads when logged in
- [ ] `/dashboard` redirects logged-out users to sign-in
- [ ] `/` redirects logged-in users to `/dashboard`
- [ ] Sign out removes session and shows public content again
- [ ] No TypeScript or ESLint errors in dev terminal
- [ ] `npm run build` and `npm run start` work without errors
