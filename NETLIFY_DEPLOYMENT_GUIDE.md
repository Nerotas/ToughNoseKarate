# 🟢 Netlify Deployment Roadmap (Free Tier)

## 1. Prepare Your Repository

- Ensure your repo has two main folders:
  - `FrontEnd/` (Next.js UI)
  - `BackEnd/` (NestJS API)
- Each folder should have its own `package.json`, `tsconfig.json`, and source files.

## 2. Frontend (Next.js)

- Netlify auto-detects and builds Next.js apps in `FrontEnd/`.
- Recommended: Add a `netlify.toml` in the repo root or `FrontEnd/`:
  ```toml
  [build]
    base = "FrontEnd"
    publish = "FrontEnd/.next"
    command = "npm run build"
  ```

## 3. Backend (NestJS API)

- Netlify Functions require API endpoints as handler files in `BackEnd/netlify/functions/`.
- For simple APIs, you can use Netlify Edge Functions or convert endpoints to serverless handlers.
- For full NestJS, consider deploying the backend separately (e.g., Railway, Render) and connect via environment variables.

## 4. Environment Variables

- Add all required secrets and DB credentials in Netlify dashboard:
  - **Frontend:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.
  - **Backend:** `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL`, etc.

## 5. GitHub Integration

- Connect your repo to Netlify for automatic deploys on push.

## 6. Custom Domain (Optional)

- Set up in Netlify dashboard after deploy.

## 7. Final Checklist

- [x] Repo structure: `FrontEnd/` and `BackEnd/`  <!-- Step 1 complete -->
- [ ] Environment variables set in Netlify dashboard
- [ ] `netlify.toml` added (optional, recommended)
- [ ] GitHub repo connected to Netlify
- [ ] Test deploy and verify both UI and API endpoints

---

**Tip:** For production APIs, consider deploying NestJS backend to Railway or Render and connecting your Netlify frontend via environment variables.
