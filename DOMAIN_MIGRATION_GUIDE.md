# Domain Migration Setup Guide
## Tough Nose Karate: `toughnosekarate.netlify.app` → `www.toughnosekarate.com`

**Last Updated:** June 16, 2026
**Status:** Configuration files updated ✅ | Manual steps required 🔧

---

## ✅ What I've Already Fixed

1. **Backend CORS hardcoded URL** - Updated [src/main.ts](../BackEnd/src/main.ts) to include both `https://www.toughnosekarate.com` and `https://toughnosekarate.com`
2. **Backend .env CORS** - Updated [BackEnd/.env](../BackEnd/.env) with production domain
3. **Frontend metadata** - Updated [FrontEnd/src/app/(DashboardLayout)/metadata.tsx](../FrontEnd/src/app/%28DashboardLayout%29/metadata.tsx)
4. **Environment examples** - Updated .env files with new domain examples
5. **Database migration runner** - Created [BackEnd/scripts/run-migrations.ts](../BackEnd/scripts/run-migrations.ts) to auto-run migrations
6. **Migration npm script** - Added `migrate` and `migrate:prod` scripts to [BackEnd/package.json](../BackEnd/package.json)
7. **Railway build config** - Updated [BackEnd/nixpacks.toml](../BackEnd/nixpacks.toml) to run migrations before deploy

---

## 🔧 Manual Steps You MUST Complete

### **Step 1: Domain Registrar Setup (Required First)**
- [ ] Point DNS records for `toughnosekarate.com` to your hosting provider
- [ ] Add CNAME/A records based on your provider:
  - **If using Netlify:** Point to `toughnosekarate.netlify.app`
  - **If using custom hosting:** Point to your server IP or CDN
- [ ] Wait for DNS propagation (can take 24-48 hours)
- [ ] Verify with: `nslookup www.toughnosekarate.com`

### **Step 2: Backend Environment Variables (Railway Dashboard)**
Go to **Railway App > Variables** and set:

```
NODE_ENV=production
DB_HOST=[Your Supabase host - usually db.supabase.co]
DB_PORT=6543  (Session Pooler - IMPORTANT)
DB_USERNAME=postgres
DB_PASSWORD=[Your Supabase password]
DB_NAME=postgres
DB_SSL=true
JWT_SECRET=[Generate: openssl rand -base64 32]
CORS_ORIGINS=https://www.toughnosekarate.com,https://toughnosekarate.com
THROTTLE_TTL=60
THROTTLE_LIMIT=100
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=[From Supabase dashboard]
SUPABASE_JWT_SECRET=[From Supabase]
```

⚠️ **CRITICAL:** Use Supabase **Session Pooler** (port 6543), not Transaction Pooler

### **Step 3: GitHub Secrets (GitHub > Settings > Secrets)**
Set these for CI/CD pipelines:

```
NETLIFY_AUTH_TOKEN=[Your Netlify token]
NETLIFY_PRODUCTION_SITE_ID=[Your new site ID]
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.supabase.co:6543/postgres?schema=public&sslmode=require
SUPABASE_JWT_SECRET=[From Supabase]
JWT_SECRET=[Same as Railway]
```

### **Step 4: Frontend Environment Variables**
Update **FrontEnd/.env.local** (local dev):

```env
NEXT_PUBLIC_API_PATH=https://toughnosekarate-production.up.railway.app
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_ENABLE_DEBUG=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX  # If using Google Analytics
```

Or for custom API domain:
```env
NEXT_PUBLIC_API_PATH=https://api.toughnosekarate.com
```

### **Step 5: Supabase Configuration**
1. [ ] Log in to [supabase.io](https://supabase.io)
2. [ ] Go to your project > Settings > Database
3. [ ] Copy **Session Pooler** connection string (port 6543)
4. [ ] Verify **SSL** is enabled
5. [ ] Consider enabling **Row Level Security (RLS)** for sensitive tables:
   - Students table
   - Parents table
   - Instructors table

### **Step 6: SSL Certificate**
- [ ] **For Netlify:** Automatically managed ✅
- [ ] **For custom domain:**
  - Use **Let's Encrypt** (free)
  - Or purchase SSL certificate
  - Point HTTPS traffic to your server

### **Step 7: Test Deployment**
1. [ ] Merge domain migration PR to `main`
2. [ ] GitHub Actions will trigger build
3. [ ] Railway will automatically:
   - Run `npm run build`
   - Run `npm run migrate:prod` (new migrations)
   - Start app on `0.0.0.0:PORT`
4. [ ] Check Railway logs for migration success
5. [ ] Test API endpoint: `https://api.toughnosekarate.com/api-docs` (if using custom domain)

### **Step 8: Redirect Old Domain (Recommended)**
Add to **netlify.toml** to redirect old Netlify URL:

```toml
[[redirects]]
  from = "/*"
  to = "https://www.toughnosekarate.com/:splat"
  status = 301
  force = true
```

### **Step 9: Post-Launch Monitoring**
- [ ] Monitor Railway logs for errors
- [ ] Check frontend/backend communication
- [ ] Verify CORS isn't blocking requests
- [ ] Test user login flow
- [ ] Check database queries working
- [ ] Monitor Supabase for connection issues

---

## 🐛 Troubleshooting Common Issues

### Issue: CORS Error in Browser
```
Access to XMLHttpRequest from origin 'https://www.toughnosekarate.com' has been blocked by CORS policy
```
**Fix:** Verify `CORS_ORIGINS` env var includes your domain in Railway dashboard

### Issue: Database Migration Fails
```
❌ Migration failed: connect ECONNREFUSED
```
**Fix:** Verify `DB_HOST`, `DB_PORT`, and `DB_SSL` are correct for Supabase Session Pooler

### Issue: SSL Certificate Error
```
Error: unable to verify the first certificate
```
**Fix:** Ensure `DB_SSL=true` and `rejectUnauthorized: false` in [app.module.ts](../BackEnd/src/app.module.ts)

### Issue: 404 on New Domain
**Fix:** Wait for DNS propagation (24-48 hours) and clear browser cache

---

## 📋 Deployment Checklist

- [ ] DNS records configured and propagating
- [ ] Railway environment variables set
- [ ] GitHub secrets updated
- [ ] Supabase Session Pooler configured (port 6543)
- [ ] Backend build passes locally: `npm run build` in BackEnd/
- [ ] Migration script works locally: `npm run migrate` in BackEnd/
- [ ] Frontend builds: `npm run build` in FrontEnd/
- [ ] SSL certificate ready
- [ ] Test API connection from frontend
- [ ] Monitor logs after first deploy
- [ ] Old domain redirects to new domain
- [ ] Analytics updated with new domain

---

## 🚀 Quick Commands for Testing

### Test Backend Locally
```bash
cd BackEnd
npm install
npm run build
npm run migrate  # Test migration runner
npm run start:dev
```

### Test Frontend Locally
```bash
cd FrontEnd
npm install
npm run dev
```

### Test API Connection
```bash
# Should return API docs
curl https://api.toughnosekarate.com/api-docs

# Should work if frontend can reach it
curl https://www.toughnosekarate.com/
```

---

## 📞 Support Resources

- **Railway Docs:** https://docs.railway.app
- **Supabase Docs:** https://supabase.com/docs
- **NestJS Docs:** https://docs.nestjs.com
- **Next.js Docs:** https://nextjs.org/docs

---

## 🔐 Security Checklist

- [ ] Never commit real secrets to git (keep tracked `.env` files as templates/placeholders only; use `.env.local` for local secrets)
- [ ] Rotate `JWT_SECRET` after migration
- [ ] Enable database backups in Supabase
- [ ] Review database access logs
- [ ] Set up monitoring alerts
- [ ] Enable HTTPS everywhere
- [ ] Consider rate limiting (already configured)
- [ ] Review CORS whitelist is minimal

---

**Next Steps:** Follow the manual steps in order, starting with Step 1 (DNS setup).
