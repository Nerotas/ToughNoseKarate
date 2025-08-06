# Netlify Deployment Guide for Tough Nose Karate

This guide provides step-by-step instructions for deploying the Tough Nose Karate application to Netlify, including domain purchase, SSL configuration, and production setup.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Domain Purchase & Configuration](#domain-purchase--configuration)
- [Database Setup (PlanetScale)](#database-setup-planetscale)
- [Netlify Account Setup](#netlify-account-setup)
- [GitHub Integration](#github-integration)
- [Environment Variables Configuration](#environment-variables-configuration)
- [DNS Configuration](#dns-configuration)
- [SSL Certificate Setup](#ssl-certificate-setup)
- [Deployment Process](#deployment-process)
- [Post-Deployment Verification](#post-deployment-verification)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

Before starting the deployment process, ensure you have:

- [ ] GitHub account with the ToughNoseKarate repository
- [ ] Valid email address for domain registration
- [ ] Credit card for domain purchase and premium services
- [ ] Basic understanding of DNS concepts
- [ ] Access to the codebase with deployment configurations

## 🌐 Domain Purchase & Configuration

### Step 1: Choose a Domain Registrar

**Recommended Registrars:**
- **Namecheap** (Best value, good support)
- **Google Domains** (Easy integration, reliable)
- **Cloudflare Registrar** (At-cost pricing, fast DNS)
- **GoDaddy** (Popular, extensive features)

### Step 2: Domain Name Selection

**Suggested Domain Names:**
- `toughnosekarate.com` (Primary choice)
- `toughnose-karate.com` (Alternative)
- `tnkarate.com` (Short version)
- `toughnosekarateacademy.com` (Descriptive)

**Domain Purchase Checklist:**
- [ ] Search for domain availability
- [ ] Purchase domain for 1-2 years initially
- [ ] Enable domain privacy protection
- [ ] Set up auto-renewal
- [ ] Configure DNS to point to Netlify

### Step 3: Domain Configuration

**DNS Records to Configure:**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's load balancer IP)

Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: CNAME
Name: api
Value: your-backend-site.netlify.app
```

## 🗄️ Database Setup (PlanetScale)

### Step 1: Create PlanetScale Account

1. **Sign Up Process:**
   - Visit [planetscale.com](https://planetscale.com)
   - Sign up with GitHub account (recommended)
   - Verify email address
   - Complete onboarding

2. **Create Database:**
   ```bash
   # Database Configuration
   Database Name: toughnose-karate-prod
   Region: US East (closest to Netlify)
   Plan: Hobby (free tier to start)
   ```

### Step 2: Database Configuration

1. **Create Branches:**
   ```bash
   # Production branch (automatically created)
   main

   # Development branch
   development
   ```

2. **Run Migrations:**
   ```bash
   # Connect to development branch
   pscale connect toughnose-karate-prod development

   # Run your SQL migrations
   mysql -h 127.0.0.1 -P 3306 -u root < DB/migrations/021_create_instructors_table.sql
   # Add other migration files as needed
   ```

3. **Promote to Production:**
   ```bash
   # Create deploy request
   pscale deploy-request create toughnose-karate-prod development

   # Deploy to production
   pscale deploy-request deploy toughnose-karate-prod <deploy-request-number>
   ```

### Step 3: Connection String

**Get Connection Strings:**
```bash
# Production connection string format:
mysql://username:password@host:port/database?sslmode=require

# Example:
mysql://abcd1234:pscale_pw_abcd1234@aws.connect.psdb.cloud:3306/toughnose-karate-prod?sslmode=require
```

## 🚀 Netlify Account Setup

### Step 1: Create Netlify Account

1. **Sign Up:**
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub account
   - Choose Pro plan ($19/month) for custom domains and advanced features

2. **Account Configuration:**
   - [ ] Verify email address
   - [ ] Complete billing setup
   - [ ] Enable two-factor authentication

### Step 2: Create Sites

**Create Two Sites:**

1. **Production Site:**
   ```
   Site Name: toughnose-karate
   Custom Domain: toughnosekarate.com
   ```

2. **Staging Site:**
   ```
   Site Name: toughnose-karate-staging
   Custom Domain: staging.toughnosekarate.com
   ```

## 🔗 GitHub Integration

### Step 1: Connect Repository

1. **Add New Site:**
   - Click "New site from Git"
   - Choose GitHub
   - Select "Nerotas/ToughNoseKarate" repository
   - Configure build settings

2. **Frontend Build Settings:**
   ```bash
   # Build Configuration
   Base Directory: FrontEnd
   Build Command: npm run build
   Publish Directory: FrontEnd/.next
   
   # Environment Variables (set in Netlify dashboard)
   NODE_VERSION=18
   NPM_FLAGS=--production=false
   ```

3. **Backend Build Settings:**
   ```bash
   # Build Configuration  
   Base Directory: BackEnd
   Build Command: npm run build
   Publish Directory: BackEnd/dist
   Functions Directory: BackEnd/netlify/functions
   ```

### Step 2: Branch Configuration

**Branch Deploy Settings:**
```
Production Branch: main
Branch Deploys: Deploy only staging branch
Deploy Previews: All pull requests
```

## 🔧 Environment Variables Configuration

### Step 1: Backend Environment Variables

**In Netlify Dashboard → Site Settings → Environment Variables:**

```env
# Database
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud:3306/toughnose-karate-prod?sslmode=require

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters-long

# Application
NODE_ENV=production
PORT=3001

# CORS - Update with your actual domains
CORS_ORIGINS=https://toughnosekarate.com,https://www.toughnosekarate.com,https://staging.toughnosekarate.com
```

### Step 2: Frontend Environment Variables

```env
# API Configuration - Update with your actual Netlify function URLs
NEXT_PUBLIC_API_URL=https://toughnose-karate-backend.netlify.app/.netlify/functions/api/v1
NEXT_PUBLIC_API_PATH=https://toughnose-karate-backend.netlify.app/.netlify/functions/api
NEXT_PUBLIC_API_VERSION=v1

# Application
NEXT_PUBLIC_DEBUG=false
NODE_ENV=production
```

### Step 3: GitHub Secrets

**In GitHub Repository → Settings → Secrets and Variables → Actions:**

```env
# Netlify Deployment
NETLIFY_AUTH_TOKEN=your-netlify-personal-access-token
NETLIFY_STAGING_SITE_ID=your-staging-site-id
NETLIFY_PRODUCTION_SITE_ID=your-production-site-id

# API URLs for different environments
NEXT_PUBLIC_API_URL_STAGING=https://staging-backend.netlify.app/.netlify/functions/api/v1
NEXT_PUBLIC_API_URL_PRODUCTION=https://backend.toughnosekarate.com/.netlify/functions/api/v1
```

## 🌍 DNS Configuration

### Step 1: Netlify DNS Setup

1. **Custom Domain Configuration:**
   ```bash
   # In Netlify Dashboard → Domain Settings
   Primary Domain: toughnosekarate.com
   Redirect www to primary: Yes
   
   # Add domains:
   - toughnosekarate.com
   - www.toughnosekarate.com
   - staging.toughnosekarate.com
   ```

2. **DNS Records (Set in your domain registrar):**
   ```dns
   # Primary domain
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: 300
   
   # WWW subdomain
   Type: CNAME
   Name: www
   Value: toughnose-karate.netlify.app
   TTL: 300
   
   # Staging subdomain
   Type: CNAME
   Name: staging
   Value: toughnose-karate-staging.netlify.app
   TTL: 300
   
   # API subdomain (if using separate backend)
   Type: CNAME
   Name: api
   Value: toughnose-karate-backend.netlify.app
   TTL: 300
   ```

### Step 2: DNS Propagation Check

**Verify DNS Setup:**
```bash
# Check DNS propagation (use online tools)
https://dnschecker.org/

# Command line verification
nslookup toughnosekarate.com
dig toughnosekarate.com
```

## 🔒 SSL Certificate Setup

### Step 1: Automatic SSL (Netlify)

Netlify automatically provides SSL certificates via Let's Encrypt:

1. **Enable HTTPS:**
   - Go to Domain Settings in Netlify
   - SSL/TLS section will show "Certificate provisioning"
   - Wait 10-60 minutes for certificate generation

2. **Force HTTPS:**
   ```bash
   # In Netlify Dashboard → Domain Settings
   ✅ Force HTTPS
   ✅ Use Netlify's certificate
   ```

### Step 2: SSL Verification

**Check SSL Status:**
```bash
# Online SSL checker
https://www.ssllabs.com/ssltest/

# Command line verification
openssl s_client -connect toughnosekarate.com:443
```

## 🚀 Deployment Process

### Step 1: Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] DNS records properly set
- [ ] Database migrations ready
- [ ] GitHub Actions workflows tested
- [ ] Frontend and backend builds successful locally

### Step 2: Initial Deployment

1. **Deploy Staging First:**
   ```bash
   # Push to staging branch
   git checkout staging
   git push origin staging
   
   # Verify staging deployment
   https://staging.toughnosekarate.com
   ```

2. **Deploy Production:**
   ```bash
   # Merge to main branch
   git checkout main
   git merge staging
   git push origin main
   
   # Verify production deployment
   https://toughnosekarate.com
   ```

### Step 3: Database Setup

1. **Create Admin User:**
   ```sql
   INSERT INTO instructors (
     email, 
     password_hash, 
     first_name, 
     last_name, 
     role
   ) VALUES (
     'admin@toughnosekarate.com',
     '$2b$10$your-hashed-password-here',
     'Admin',
     'User',
     'admin'
   );
   ```

2. **Run Data Migrations:**
   ```bash
   # Connect to production database
   pscale shell toughnose-karate-prod main
   
   # Insert initial data (belt requirements, etc.)
   ```

## ✅ Post-Deployment Verification

### Step 1: Functionality Testing

**Frontend Tests:**
- [ ] Homepage loads correctly
- [ ] Login functionality works
- [ ] Protected routes require authentication
- [ ] Student data displays properly
- [ ] Responsive design works on mobile

**Backend Tests:**
- [ ] API endpoints respond correctly
- [ ] Authentication flow works
- [ ] Database connections established
- [ ] CORS headers properly configured
- [ ] SSL certificates valid

### Step 2: Performance Testing

**Use These Tools:**
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] [GTmetrix](https://gtmetrix.com/)
- [ ] [WebPageTest](https://www.webpagetest.org/)

**Target Metrics:**
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 4s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 5s

## 📊 Monitoring & Analytics

### Step 1: Netlify Analytics

**Enable Analytics:**
```bash
# In Netlify Dashboard
Analytics → Enable Netlify Analytics ($9/month)
```

**Key Metrics to Monitor:**
- Page views and unique visitors
- Top pages and resources
- Bandwidth usage
- Geographic distribution

### Step 2: Error Monitoring (Optional)

**Sentry Integration:**
```bash
# Install Sentry
npm install @sentry/nextjs @sentry/node

# Configure error tracking
# Frontend: sentry.client.config.js
# Backend: main.ts
```

### Step 3: Uptime Monitoring

**Recommended Services:**
- **UptimeRobot** (Free basic monitoring)
- **Pingdom** (Advanced monitoring)
- **StatusCake** (Affordable option)

**Monitor These Endpoints:**
- `https://toughnosekarate.com` (Frontend)
- `https://toughnosekarate.com/.netlify/functions/api/health` (Backend)

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Build Failures

**Issue**: Frontend build fails
```bash
# Solution: Check build logs
npm run build --verbose

# Common fixes:
- Update Node.js version to 18
- Clear npm cache: npm cache clean --force
- Check environment variables
```

**Issue**: Backend function timeout
```bash
# Solution: Optimize function cold starts
- Reduce package size
- Use connection pooling
- Enable function warming
```

#### 2. DNS Issues

**Issue**: Domain not resolving
```bash
# Solution: Check DNS propagation
dig toughnosekarate.com

# Fixes:
- Wait 24-48 hours for full propagation
- Clear DNS cache locally
- Verify DNS records with registrar
```

#### 3. SSL Certificate Issues

**Issue**: SSL certificate not provisioning
```bash
# Solution: Check domain verification
- Ensure DNS records point to Netlify
- Remove conflicting A records
- Contact Netlify support if issue persists
```

#### 4. Database Connection Issues

**Issue**: Cannot connect to PlanetScale
```bash
# Solution: Check connection string
- Verify credentials in PlanetScale dashboard
- Ensure SSL mode is required
- Check firewall settings
```

### Support Contacts

**Netlify Support:**
- Community Forum: [community.netlify.com](https://community.netlify.com)
- Email Support: Pro/Business plans
- Live Chat: Business plans

**PlanetScale Support:**
- Documentation: [planetscale.com/docs](https://planetscale.com/docs)
- Discord Community: [discord.gg/planetscale](https://discord.gg/planetscale)
- Email Support: Paid plans

## 💰 Cost Breakdown

### Monthly Costs

**Domain Registration:**
- Domain: $10-15/year ($1-2/month)
- Privacy Protection: $5-10/year

**Netlify Hosting:**
- Pro Plan: $19/month (required for custom domains)
- Analytics: $9/month (optional)
- Functions: 125k invocations/month included

**PlanetScale Database:**
- Hobby Plan: Free (1 database, 1GB storage)
- Scaler Pro: $29/month (when scaling needed)

**Additional Services (Optional):**
- Sentry Error Tracking: $26/month
- Uptime Monitoring: $5-15/month

**Total Estimated Monthly Cost: $30-50/month**

## 📈 Scaling Considerations

### Traffic Growth Planning

**Current Setup Supports:**
- Up to 100k monthly page views
- 125k function invocations/month
- 1GB database storage

**Scaling Triggers:**
- **Database**: Upgrade to Scaler Pro at 1GB limit
- **Functions**: Monitor invocation count
- **Bandwidth**: Netlify Pro includes 100GB/month

### Performance Optimization

**Future Enhancements:**
- CDN optimization for global users
- Image optimization and compression
- Database read replicas for better performance
- Caching strategies for frequent API calls

---

## ✅ Deployment Completion Checklist

**Pre-Launch:**
- [ ] Domain purchased and configured
- [ ] DNS records set and propagated
- [ ] SSL certificates installed and verified
- [ ] Database setup and migrated
- [ ] Environment variables configured
- [ ] GitHub Actions workflows tested

**Post-Launch:**
- [ ] Frontend and backend functionality verified
- [ ] Admin account created and tested
- [ ] Performance metrics within targets
- [ ] Monitoring and analytics enabled
- [ ] Backup procedures documented
- [ ] Support contacts and documentation ready

**Congratulations! Your Tough Nose Karate application is now live! 🥋🎉**
