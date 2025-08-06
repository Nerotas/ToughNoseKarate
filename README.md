# Tough Nose Karate Management System

A comprehensive martial arts management application built with Next.js (frontend) and NestJS (backend), featuring JWT cookie-based authentication and MySQL database integration.

## 🚀 Live Application

- **Production**: [https://toughnose-karate.netlify.app](https://toughnose-karate.netlify.app)
- **Staging**: [https://toughnose-karate-staging.netlify.app](https://toughnose-karate-staging.netlify.app)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Netlify Hosting Roadmap](#netlify-hosting-roadmap)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## ✨ Features

- **Student Management**: Track student progress, belt rankings, and personal information
- **Belt Requirements**: Manage belt requirements and progression criteria
- **Authentication**: Secure JWT cookie-based authentication for instructors
- **Role-Based Access**: Instructor and admin role management
- **Responsive Design**: Mobile-friendly interface with Material-UI components
- **Server-Side Rendering**: Optimized performance with Next.js SSR
- **API Documentation**: Swagger/OpenAPI documentation for backend

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query + Context API
- **HTTP Client**: Axios with interceptors
- **Styling**: CSS-in-JS with MUI System

### Backend

- **Framework**: NestJS with TypeScript
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT with cookie-based storage
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator and DTOs

### Infrastructure

- **Frontend Hosting**: Netlify
- **Backend Hosting**: Netlify Functions
- **Database**: PlanetScale (MySQL-compatible)
- **CI/CD**: GitHub Actions
- **Monitoring**: Netlify Analytics

## 🏗 Architecture

```
├── FrontEnd/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   └── netlify.toml         # Netlify configuration
│
├── BackEnd/                 # NestJS application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── guards/         # Route guards
│   └── netlify/
│       └── functions/      # Serverless functions
│
├── DB/                     # Database migrations
│   └── migrations/         # SQL migration files
│
└── .github/
    └── workflows/          # CI/CD pipelines
```

## 💻 Local Development

### Prerequisites

- Node.js 18 or higher
- MySQL 8.0 or higher
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nerotas/ToughNoseKarate.git
   cd ToughNoseKarate
   ```

2. **Backend Setup**

   ```bash
   cd BackEnd
   npm install

   # Copy environment file
   cp .env.example .env

   # Configure your database connection in .env
   # Run migrations
   npm run migration:run

   # Start development server
   npm run start:dev
   ```

3. **Frontend Setup**

   ```bash
   cd ../FrontEnd
   npm install

   # Copy environment file
   cp .env.local.example .env.local

   # Start development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

## 🚀 Deployment

The application uses automated deployment through GitHub Actions to Netlify.

### Deployment Triggers

- **Production**: Push to `main` branch
- **Staging**: Push to `staging` branch
- **Pull Requests**: Automatic preview deployments

### Manual Deployment

```bash
# Build frontend
cd FrontEnd
npm run build

# Build backend
cd ../BackEnd
npm run build
```

## 📋 Netlify Hosting Roadmap

### Phase 1: Repository and Environment Setup ✅

#### 1.1 GitHub Repository Preparation

- [x] All code committed to main branch
- [x] Separate branches for `staging` and `production`
- [x] Proper `.gitignore` files for both frontend and backend
- [x] Environment variables documentation

#### 1.2 Environment Variables Documentation

**Backend Environment Variables:**

```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secure-jwt-secret-here
NODE_ENV=production
PORT=3001
CORS_ORIGINS=https://your-app.netlify.app,https://your-staging-app.netlify.app
```

**Frontend Environment Variables:**

```env
NEXT_PUBLIC_API_URL=https://your-backend.netlify.app/v1
NEXT_PUBLIC_API_PATH=https://your-backend.netlify.app
NEXT_PUBLIC_API_VERSION=v1
NEXT_PUBLIC_DEBUG=false
```

### Phase 2: Database Hosting

#### 2.1 Database Options

- **✅ Recommended**: PlanetScale (MySQL-compatible, serverless)
- **Alternative**: Railway or Render for MySQL hosting
- **Alternative**: Supabase with PostgreSQL (requires migration)

#### 2.2 Database Setup Steps

1. Create PlanetScale account and database
2. Configure connection string
3. Run migrations on production database
4. Set up backup and monitoring

### Phase 3: Backend Deployment Setup ✅

#### 3.1 Netlify Functions Configuration

- [x] `netlify/functions/api.ts` - Main serverless function
- [x] Serverless Express adapter for NestJS
- [x] Cookie-based JWT authentication
- [x] CORS configuration for frontend domains

#### 3.2 Backend Features

- JWT authentication with HttpOnly cookies
- Role-based access control (instructor/admin)
- Automatic token refresh
- Comprehensive API documentation

### Phase 4: Frontend Deployment Setup ✅

#### 4.1 Next.js Configuration

- [x] Optimized for production builds
- [x] Server-side rendering with public data pre-fetching
- [x] Client-side authentication for protected routes
- [x] Responsive design with Material-UI

#### 4.2 Frontend Features

- Server-side rendering for public content
- Cookie-based authentication
- Automatic API request retries
- Progressive web app capabilities

### Phase 5: CI/CD Pipeline ✅

#### 5.1 GitHub Actions Workflows

- [x] **Frontend Pipeline**: `.github/workflows/frontend-deploy.yml`

  - Lint and test frontend code
  - Build Next.js application
  - Deploy to Netlify (staging/production)

- [x] **Backend Pipeline**: `.github/workflows/backend-deploy.yml`
  - Lint and test backend code
  - Build NestJS application
  - Deploy functions to Netlify

#### 5.2 Deployment Features

- Automatic deployments on push
- Preview deployments for pull requests
- Environment-specific configurations
- Build artifact caching for faster deployments

### Phase 6: Security and Performance ⏳

#### 6.1 Security Measures

- [ ] Content Security Policy (CSP) headers
- [x] HttpOnly cookies for JWT storage
- [x] CORS configuration
- [ ] Rate limiting implementation
- [ ] Security headers configuration

#### 6.2 Performance Optimization

- [x] Asset caching configuration
- [ ] Image optimization
- [ ] CDN setup for static assets
- [x] Database connection pooling
- [ ] Performance monitoring setup

### Phase 7: Monitoring and Maintenance ⏳

#### 7.1 Monitoring Setup

- [ ] Netlify Analytics configuration
- [ ] Error tracking (Sentry integration)
- [ ] Uptime monitoring
- [ ] Performance monitoring dashboard

#### 7.2 Maintenance Procedures

- [ ] Automated database backups
- [ ] Deployment rollback procedures
- [ ] Health check endpoints
- [ ] Log aggregation and analysis

## 🔧 Environment Variables

### Required Backend Variables

```env
# Database
DATABASE_URL=mysql://username:password@host:port/database_name

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters

# Application
NODE_ENV=production
PORT=3001

# CORS
CORS_ORIGINS=https://your-frontend-domain.netlify.app
```

### Required Frontend Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.netlify.app/v1
NEXT_PUBLIC_API_PATH=https://your-backend-domain.netlify.app
NEXT_PUBLIC_API_VERSION=v1

# Application
NEXT_PUBLIC_DEBUG=false
```

### GitHub Secrets (for CI/CD)

```
NETLIFY_AUTH_TOKEN=your-netlify-auth-token
NETLIFY_STAGING_SITE_ID=your-staging-site-id
NETLIFY_PRODUCTION_SITE_ID=your-production-site-id
NEXT_PUBLIC_API_URL=your-backend-url
NEXT_PUBLIC_API_PATH=your-backend-path
```

## 📊 Deployment Status

| Component             | Status            | URL                                          |
| --------------------- | ----------------- | -------------------------------------------- |
| Frontend (Production) | ✅ Ready          | [Deploy to Netlify](https://app.netlify.com) |
| Frontend (Staging)    | ✅ Ready          | [Deploy to Netlify](https://app.netlify.com) |
| Backend Functions     | ✅ Ready          | Netlify Functions                            |
| Database              | ⏳ Setup Required | PlanetScale                                  |
| CI/CD Pipeline        | ✅ Configured     | GitHub Actions                               |

## 🔄 Deployment Workflow

1. **Development**

   ```bash
   # Create feature branch
   git checkout -b feature/new-feature

   # Make changes and commit
   git add .
   git commit -m "Add new feature"

   # Push to GitHub
   git push origin feature/new-feature
   ```

2. **Staging Deployment**

   ```bash
   # Merge to staging branch
   git checkout staging
   git merge feature/new-feature
   git push origin staging
   # Automatic deployment to staging site
   ```

3. **Production Deployment**
   ```bash
   # Merge to main branch
   git checkout main
   git merge staging
   git push origin main
   # Automatic deployment to production site
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Update documentation for API changes
- Ensure all linting checks pass
- Test across different browsers and devices

## 📚 API Documentation

Once deployed, the API documentation is available at:

- **Production**: `https://your-backend.netlify.app/api-docs`
- **Local**: `http://localhost:3001/api-docs`

## 🛡 Security

- JWT tokens stored in HttpOnly cookies
- CORS configured for specific domains
- Input validation on all endpoints
- Role-based access control
- Secure database connections
- Environment variable protection

## 📞 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team
- Check the API documentation for endpoint details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the martial arts community**
