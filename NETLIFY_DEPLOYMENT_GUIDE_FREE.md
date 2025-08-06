# Free Netlify Deployment Guide - Tough Nose Karate

Deploy your karate management application **completely free** using Netlify's free tier and free database options (Supabase, Railway, Aiven, or TiDB Cloud). Perfect for small dojos or getting started!

## 🆓 Why This Free Setup?

**Total Cost: $0/month**

- ✅ **Netlify Free**: Frontend + Backend API hosting
- ✅ **Free Database Options**: Multiple MySQL/PostgreSQL providers with free tiers
- ✅ **Professional URLs**: yourapp.netlify.app
- ✅ **SSL Certificates**: Automatic HTTPS
- ✅ **No Credit Card**: Sign up and deploy immediately

## 📋 Table of Contents

- [What You Get](#what-you-get)
- [Prerequisites](#prerequisites)
- [Quick Start Guide](#quick-start-guide)
- [Database Setup](#database-setup)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Testing & Verification](#testing--verification)
- [Understanding Limits](#understanding-limits)
- [When to Upgrade](#when-to-upgrade)
- [Troubleshooting](#troubleshooting)

## ✨ What You Get

### Complete Karate Management System:

- 🥋 **Student Management** - Track progress, belt rankings, personal info
- 🏆 **Belt Requirements** - Manage advancement criteria
- 🔐 **Secure Authentication** - JWT-based instructor login
- 📱 **Mobile Responsive** - Works on all devices
- ⚡ **Fast Performance** - CDN-powered delivery
- 🔒 **SSL Security** - Automatic HTTPS encryption

### Your Free URLs:

- **Frontend**: `https://toughnose-karate.netlify.app`
- **Backend API**: `https://toughnose-karate-api.netlify.app`
- **API Docs**: `https://toughnose-karate-api.netlify.app/.netlify/functions/api/api-docs`

## ✅ Prerequisites

**What you need:**

- [ ] GitHub account (free)
- [ ] Email address for account verification
- [ ] 45 minutes of your time

**What you DON'T need:**

- ❌ Credit card or payment method
- ❌ Domain purchase
- ❌ DNS configuration
- ❌ SSL certificate setup
- ❌ Server management

## 🚀 Quick Start Guide

### Step 1: Create Accounts (10 minutes)

#### 1.1 Create Netlify Account

```bash
# 1. Visit netlify.com
# 2. Click "Sign up"
# 3. Choose "Sign up with GitHub"
# 4. Authorize Netlify access
# 5. Verify email address
# 6. No payment method required!
```

#### 1.2 Create Database Account

```bash
# Choose ONE of these free database options:

# Option A: Supabase (Recommended - PostgreSQL)
1. Visit supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Free tier: 500MB database, 50MB file storage

# Option B: Railway (PostgreSQL)
1. Visit railway.app
2. Sign up with GitHub
3. Free tier: $5 monthly credits (plenty for database)

# Option C: Aiven (MySQL/PostgreSQL)
1. Visit aiven.io
2. Sign up for free trial
3. Free tier: 1 month trial, then $25/month (consider for testing)

# Option D: TiDB Cloud (MySQL-compatible)
1. Visit tidbcloud.com
2. Sign up with GitHub/Google
3. Free tier: 5GB storage, 1 year free
```

### Step 2: Setup Database (15 minutes)

#### 2.1 Choose Your Free Database Option

We'll use **Supabase** as the recommended free option, but I'll also show Railway as an alternative.

#### Option A: Supabase Setup (Recommended)

##### 2.1.1 Create Supabase Project

```bash
# In Supabase Dashboard:
1. Click "New project"
2. Organization: Create new or use existing
3. Project name: "toughnose-karate"
4. Database password: [Generate strong password - save it!]
5. Region: "East US" (closest to Netlify)
6. Pricing plan: Free tier (500MB database)
7. Click "Create new project"
```

##### 2.1.2 Get Connection Details

```bash
# In Project Settings → Database:
1. Find "Connection string" section
2. Mode: "Session pooling"
3. Copy the connection string
4. Replace [YOUR-PASSWORD] with your database password

# Example format:
postgresql://postgres.abc123:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

##### 2.1.3 Convert MySQL Schema to PostgreSQL

```bash
# Since Supabase uses PostgreSQL, we need to convert the schema:
# Common conversions needed:
# - AUTO_INCREMENT → SERIAL
# - TINYINT → SMALLINT
# - DATETIME → TIMESTAMP
# - TEXT with length → VARCHAR(length)

# In Supabase SQL Editor, run the converted schema:
1. Go to SQL Editor in Supabase dashboard
2. Copy your converted schema (see example below)
3. Run the SQL to create tables
```

#### Option B: Railway Setup (Alternative)

##### 2.1.1 Create Railway Database

```bash
# In Railway Dashboard:
1. Click "New Project"
2. Choose "Empty Project"
3. Click "New Service"
4. Select "Database" → "PostgreSQL"
5. Database automatically provisioned
6. Note: Uses $5 monthly credits (generous for small database)
```

##### 2.1.2 Get Railway Connection String

```bash
# In PostgreSQL service:
1. Click on PostgreSQL service
2. Go to "Connect" tab
3. Copy "Postgres Connection URL"

# Format: postgresql://postgres:password@host:port/database
```

#### 2.2 Database Schema Setup

##### Use Cleaned Schema (Recommended)

```bash
# We've created an optimized schema that removes unused tables
# Use DB/TNK_CLEANED.sql instead of DB/TNK.sql for deployment

# Benefits of cleaned schema:
# - 10 fewer unused tables
# - Smaller database size (better for free tiers)
# - Faster deployments
# - Cleaner production environment
```

##### PostgreSQL Schema (Converted from MySQL)

```sql
-- Core Tables (Students, Instructors, Parents, Belt Requirements)
CREATE TABLE instructors (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'instructor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    preferred_name VARCHAR(100),
    age INTEGER,
    belt_rank VARCHAR(50),
    start_date DATE,
    end_date DATE,
    last_test DATE,
    email VARCHAR(255),
    phone VARCHAR(20),
    notes TEXT,
    active BOOLEAN DEFAULT true,
    eligible_for_testing BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE belt_requirements (
    id SERIAL PRIMARY KEY,
    belt_order INTEGER NOT NULL UNIQUE,
    belt_rank VARCHAR(50) NOT NULL,
    forms JSONB NOT NULL DEFAULT '[]',
    stances JSONB NOT NULL DEFAULT '[]',
    blocks JSONB NOT NULL DEFAULT '[]',
    punches JSONB NOT NULL DEFAULT '[]',
    kicks JSONB NOT NULL DEFAULT '[]',
    jumps JSONB NOT NULL DEFAULT '[]',
    falling JSONB NOT NULL DEFAULT '[]',
    one_steps JSONB NOT NULL DEFAULT '[]',
    self_defense JSONB NOT NULL DEFAULT '[]',
    comments TEXT,
    color VARCHAR(7),
    text_color VARCHAR(7) DEFAULT '#000000',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teaching Content Tables (Used by Frontend)
CREATE TABLE form_definitions (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) NOT NULL,
    korean_name VARCHAR(100) NOT NULL,
    meaning VARCHAR(200) NOT NULL,
    belt_rank VARCHAR(50) NOT NULL,
    belt_color VARCHAR(7) NOT NULL,
    belt_text_color VARCHAR(7) NOT NULL DEFAULT '#000000',
    difficulty_level INTEGER NOT NULL,
    description TEXT,
    video_link VARCHAR(500),
    key_points JSONB NOT NULL DEFAULT '[]',
    active_indicator BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kicks_definitions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    korean VARCHAR(100) NOT NULL,
    belt VARCHAR(45) NOT NULL,
    belt_color VARCHAR(7) NOT NULL,
    description TEXT NOT NULL,
    target TEXT NOT NULL,
    execution JSONB NOT NULL DEFAULT '[]',
    key_points JSONB NOT NULL DEFAULT '[]',
    common_mistakes JSONB NOT NULL DEFAULT '[]',
    applications JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add other *_definitions tables as needed
-- (punches_definitions, stance_definitions, onestep_definitions, self_defense_definitions)
-- Follow the same pattern as kicks_definitions above
```

##### Run Schema in Database

```bash
# For Supabase:
1. Go to SQL Editor in Supabase dashboard
2. Paste the PostgreSQL schema above
3. Click "Run" to execute
4. Verify tables are created in Table Editor

# For Railway:
1. Click on PostgreSQL service → Data tab
2. Use built-in query editor
3. Paste and execute schema
4. Verify tables in database explorer
```

### Step 3: Deploy Backend API (15 minutes)

#### 3.1 Create Backend Site

```bash
# In Netlify Dashboard:
1. Click "Add new site"
2. Choose "Import an existing project"
3. Select "GitHub" as your Git provider
4. Choose "Nerotas/ToughNoseKarate" repository
5. Configure build settings:
   - Site name: "toughnose-karate-api" (or similar)
   - Base directory: "BackEnd"
   - Build command: "npm run build"
   - Publish directory: "dist"
   - Functions directory: "BackEnd/netlify/functions"
```

#### 3.2 Configure Backend Environment Variables

```bash
# In Site Settings → Environment Variables, add:

DATABASE_URL
Value: [Your database connection string from Step 2.2]
# For Supabase: postgresql://postgres.abc123:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres
# For Railway: postgresql://postgres:password123@containers-us-west-1.railway.app:5432/railway

JWT_SECRET
Value: [Generate a random 32+ character string]
Example: "super-secure-jwt-secret-for-karate-app-2024"

NODE_ENV
Value: "production"

PORT
Value: "3001"

CORS_ORIGINS
Value: "https://toughnose-karate.netlify.app"
(Update with your actual frontend URL after Step 4)
```

#### 3.3 Deploy Backend

```bash
# Netlify will automatically:
1. Clone your repository
2. Install dependencies (npm install)
3. Build your application (npm run build)
4. Deploy as serverless functions

# Your backend will be live at:
https://[your-site-name].netlify.app/.netlify/functions/api
```

### Step 4: Deploy Frontend (10 minutes)

#### 4.1 Create Frontend Site

```bash
# In Netlify Dashboard:
1. Click "Add new site"
2. Choose "Import an existing project"
3. Select "GitHub"
4. Choose "Nerotas/ToughNoseKarate" (same repository)
5. Configure build settings:
   - Site name: "toughnose-karate" (or similar)
   - Base directory: "FrontEnd"
   - Build command: "npm run build"
   - Publish directory: ".next"
```

#### 4.2 Configure Frontend Environment Variables

```bash
# In Site Settings → Environment Variables, add:

NEXT_PUBLIC_API_URL
Value: "https://[your-backend-site].netlify.app/.netlify/functions/api/v1"

NEXT_PUBLIC_API_PATH
Value: "https://[your-backend-site].netlify.app/.netlify/functions/api"

NEXT_PUBLIC_API_VERSION
Value: "v1"

NODE_ENV
Value: "production"

NEXT_PUBLIC_DEBUG
Value: "false"
```

#### 4.3 Update Backend CORS

```bash
# After frontend deploys, update backend CORS:
1. Go to backend site → Site Settings → Environment Variables
2. Update CORS_ORIGINS value to your frontend URL:
   "https://[your-frontend-site].netlify.app"
3. Trigger redeploy of backend
```

### Step 5: Test Your Application (10 minutes)

#### 5.1 Verify Deployment

```bash
# Test these URLs:
Frontend: https://[your-frontend-site].netlify.app
Backend Health: https://[your-backend-site].netlify.app/.netlify/functions/api/health
API Docs: https://[your-backend-site].netlify.app/.netlify/functions/api/api-docs

# All should load without errors
```

#### 5.2 Create Admin User

```bash
# Option A: Use Database Console (Supabase SQL Editor or Railway Data tab)
1. Go to your database provider's SQL console:
   - Supabase: SQL Editor
   - Railway: PostgreSQL service → Data tab
2. Run this SQL (replace with your details):

INSERT INTO instructors (
  email,
  password_hash,
  first_name,
  last_name,
  role,
  created_at,
  updated_at
) VALUES (
  'admin@toughnosekarate.com',
  '$2b$10$your-bcrypt-hashed-password-here',
  'Admin',
  'User',
  'admin',
  NOW(),
  NOW()
);

# Note: Generate password hash using bcrypt with 10 rounds
```

#### 5.3 Test Login

```bash
# 1. Visit your frontend URL
# 2. Try logging in with:
#    Email: admin@toughnosekarate.com
#    Password: [your chosen password]
# 3. Verify you can access the dashboard
# 4. Check that API calls work properly
```

## 📊 Understanding Limits

### Netlify Free Plan Limits

#### Bandwidth: 100GB/month

```bash
# Real-world usage estimates:
Small Dojo (50 students):     ~5-10GB/month   ✅ Well within limits
Medium Dojo (100 students):   ~15-25GB/month  ✅ Comfortable
Large Dojo (200+ students):   ~40-60GB/month  ✅ Still within limits

# You're very unlikely to hit this limit for a karate dojo
```

#### Function Invocations: 125,000/month

```bash
# Typical API usage per active user:
- Login: ~20 requests/month
- Data fetching: ~100 requests/month
- Updates: ~30 requests/month
- Total per user: ~150 requests/month

# Capacity:
125,000 ÷ 150 = ~830 active users/month ✅

# For most dojos: More than enough capacity
```

#### Build Minutes: 300/month

```bash
# Each deployment takes ~3-5 minutes
# 300 minutes = 60-100 deployments/month
# Most projects deploy 5-10 times/month ✅
```

### Free Database Limits

#### Supabase Free Tier

```bash
Database Size: 500MB
API Requests: 50,000/month
Storage: 1GB

# Database size estimates:
Students (1000 records):     ~1MB
Belt Requirements:           ~1MB
Instructors:                 ~1MB
Forms/Stances/etc:          ~2MB
Total for large dojo:       ~5MB

# 500MB = enough for 100+ large dojos ✅
```

#### Railway Free Credits

```bash
Monthly Credits: $5
PostgreSQL hosting: ~$0.50-2/month for small databases
Bandwidth: 100GB/month

# $5 covers 2-10 months depending on usage ✅
```

#### Connections: 1000 concurrent

```bash
# Typical usage:
- Each active user: 1-2 connections
- Small dojo: 5-10 connections
- Large dojo: 20-50 connections

# 1000 concurrent = More than enough ✅
```

## 🔄 When to Upgrade

### Upgrade Triggers

#### Netlify Free → Pro ($19/month):

- ✅ Want custom domain (toughnosekarate.com)
- ✅ Exceed 100GB bandwidth consistently
- ✅ Need priority support
- ✅ Want advanced analytics
- ✅ Professional branding important

#### Database Upgrade Paths:

**Supabase Free → Pro ($25/month):**

- ✅ Database exceeds 500MB (unlikely for most dojos)
- ✅ Need more than 50,000 API requests/month
- ✅ Want automated backups
- ✅ Need point-in-time recovery

**Railway Free → Pro ($5/month):**

- ✅ Use more than $5 in monthly credits
- ✅ Need guaranteed uptime SLA
- ✅ Want priority support
- ✅ Need custom domains for database

**General Database Upgrade Triggers:**

- ✅ Database size grows beyond free limits
- ✅ Need production-grade backups
- ✅ Want read replicas for performance
- ✅ Require 99.9% uptime SLA

### Cost Progression:

```bash
# Growth path:
Free Setup:           $0/month     (50-200 students)
+ Custom Domain:      $20/month    (Professional appearance)
+ Database Upgrade:   $50/month    (Very large operations)
+ Analytics/Extras:   $60/month    (Enterprise features)
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Failures

**Issue**: "Build failed - Module not found"

```bash
# Solution:
1. Check build logs in Netlify dashboard
2. Verify package.json has all dependencies
3. Ensure correct Node.js version (18+)

# In package.json, add:
"engines": {
  "node": ">=18.0.0"
}
```

**Issue**: "Function timeout"

```bash
# Solution:
1. Check function logs in Netlify dashboard
2. Optimize database queries
3. Verify DATABASE_URL is correct
4. Check database provider status page:
   - Supabase: status.supabase.com
   - Railway: status.railway.app
```

#### 2. Database Connection Issues

**Issue**: "Cannot connect to database"

```bash
# Solution:
1. Verify DATABASE_URL in environment variables
2. Check database provider dashboard for outages:
   - Supabase: status.supabase.com
   - Railway: status.railway.app
3. Ensure SSL mode is enabled (included in connection strings)
4. Test connection string format
```

**Issue**: "Table doesn't exist"

```bash
# Solution:
1. Run database migrations in your database console:
   - Supabase: SQL Editor
   - Railway: Data tab
2. Verify all tables are created
3. Check table names match your models
4. Ensure database schema is up to date
```

#### 3. CORS Issues

**Issue**: "CORS error in browser console"

```bash
# Solution:
1. Update CORS_ORIGINS in backend environment variables
2. Include your frontend URL exactly as deployed
3. Redeploy backend after CORS changes
4. Clear browser cache and test again
```

#### 4. Environment Variables

**Issue**: "API_URL not defined"

```bash
# Solution:
1. Verify all NEXT_PUBLIC_ variables are set
2. Check spelling and case sensitivity
3. Redeploy frontend after variable changes
4. Test in incognito/private browsing mode
```

### Getting Help

#### Free Support Resources:

- **Netlify Community**: [community.netlify.com](https://community.netlify.com)
- **Supabase Community**: [supabase.com/docs](https://supabase.com/docs)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **NestJS Documentation**: [docs.nestjs.com](https://docs.nestjs.com)

#### Debugging Steps:

1. Check build logs in Netlify dashboard
2. Test API endpoints directly
3. Verify environment variables
4. Check browser console for errors
5. Review database connection status

## 🎯 Deployment Checklist

### Pre-Launch Checklist:

- [ ] Netlify account created (free)
- [ ] Database account created (Supabase/Railway/Aiven/TiDB)
- [ ] Database created and migrated
- [ ] Backend site deployed successfully
- [ ] Frontend site deployed successfully
- [ ] Environment variables configured
- [ ] CORS settings updated

### Post-Launch Checklist:

- [ ] Frontend loads without errors
- [ ] Backend API responds correctly
- [ ] Database connections working
- [ ] Admin user created and can log in
- [ ] Student data displays properly
- [ ] Mobile responsiveness verified
- [ ] SSL certificates active (automatic)

### Success Metrics:

- [ ] Login functionality working
- [ ] Student management features accessible
- [ ] Belt requirements displaying
- [ ] API documentation available
- [ ] Performance acceptable (< 3s load time)

---

## 🎉 Congratulations!

**Your Tough Nose Karate management system is now live and completely free!**

### What You've Achieved:

✅ **Professional karate management application**
✅ **Secure authentication and data handling**
✅ **Mobile-responsive design**
✅ **Zero monthly costs**
✅ **Automatic SSL and security**
✅ **Scalable architecture**

### Your Live URLs:

- **Application**: `https://[your-site].netlify.app`
- **API Documentation**: `https://[your-api-site].netlify.app/.netlify/functions/api/api-docs`

### Next Steps:

1. **Add instructors** - Create accounts for your teaching staff
2. **Import students** - Add your current student database
3. **Configure requirements** - Set up belt advancement criteria
4. **Train your team** - Show instructors how to use the system
5. **Consider upgrade** - Add custom domain when ready for professional branding

### Ready to Upgrade?

When your dojo grows or you want a custom domain, check out our **[Premium Deployment Guide](NETLIFY_DEPLOYMENT_GUIDE_PREMIUM.md)** for toughnosekarate.com setup.

**Your dojo is now powered by modern technology - all for free! 🥋🚀**
