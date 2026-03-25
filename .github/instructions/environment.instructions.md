# Environment Variables & Secrets

---

## Core Rules

- 🚫 **Never commit secrets** to the repository
- 🚫 Never output actual secrets in logs, comments, or error messages
- ✅ Always use local `.env.local` files (never tracked in version control)
- ✅ Create `.env.example` with placeholder values only

---

## Local Development

### For Clerk (Keyless Mode)
**No environment variables needed** for local development:
- Clerk uses keyless mode by default
- Temporary API keys are auto-generated locally
- Users do not need to create a Clerk account beforehand
- Users do not need API keys or env vars to run the app

### If You Need Custom Env Vars
Create `.env.local` in **project root**:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_FEATURE_FLAG=true
SECRET_API_KEY=your-secret-value-here
```

---

## .env Files & Gitignore

### Files to Ignore
All env files are gitignored automatically:
- `.env.local` (local development)
- `.env.*.local` (environment-specific)
- `.env` (if used)

**Verify in `.gitignore`**:
```
.env
.env.local
.env.*.local
```

### .env.example (Tracked in Git)
Create and commit placeholder values:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_FEATURE_FLAG=true
SECRET_API_KEY=your_secret_key_here
```

**Use this for documentation**, so new developers know which vars are expected.

---

## Production & CI Environments

### If Deploying to Production
1. Document required env vars in `README.md` or deployment docs
2. Add secrets to your hosting platform (Vercel, Netlify, etc.):
   - Never paste secrets into code or `.env` files in the repo
   - Use your platform's secrets/environment panel
3. For Clerk in production:
   - Follow Clerk's production setup guide
   - Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` only in your hosting platform, not in code

### GitHub Actions / CI
If using CI (GitHub Actions, etc.):
1. Add secrets via **Settings > Secrets and variables > Actions**
2. Reference in workflows:
   ```yaml
   env:
     SECRET_API_KEY: ${{ secrets.SECRET_API_KEY }}
   ```
3. **Never log secrets** in build output

---

## Checklist

- [ ] `.env.local` and `.env.*` are in `.gitignore`
- [ ] `.env.example` exists with placeholder values (no real secrets)
- [ ] No secrets appear in code comments, logs, or error messages
- [ ] Clerk keyless mode works without CLERK_* env vars locally
- [ ] Production secrets are stored in hosting platform only (not in repo)
- [ ] CI secrets use GitHub/GitLab/etc. secret managers (not hardcoded)
