# 🥋 ToughNose Karate – Student, Rank & Assessment Web App

## 🌟 Summary

**ToughNose Karate** is a modern, full-stack martial arts management platform built to empower Tang Soo Do studios and students. Designed as a passion project, it streamlines the process of tracking student progress, belt rankings, attendance, and assessments, while providing instructors and administrators with a secure, intuitive dashboard. The platform is cloud-native, scalable, and optimized for both desktop and mobile, making martial arts education and management accessible from anywhere.

## 📚 Project Overview

This application centralizes all key administrative tasks for martial arts academies:

- **Student Profiles & Rank Tracking:** Easily create, update, and monitor student progress, belt history, and advancement.
- **Assessment & Grading:** Record evaluations, belt changes, and assessment results for each student.
- **Attendance Management:** Track class attendance and participation.
- **Role-Based Access:** Secure instructor and admin access using JWT authentication.
- **Responsive Dashboard:** Optimized for instructors on any device.
- **API Documentation:** Swagger-powered REST API for easy integration and testing.

## 🚀 Live Demo

Try the live app here:
[Netlify Demo](https://toughnosekarate.netlify.app)

## 🛠 Tech Stack & Skills Used

### Frontend

- **React** & **Next.js**: Modern UI, server-side rendering (SSR), and fast client experience.
- **TypeScript**: Type-safe development for maintainable, scalable code.
- **MUI (Material UI)**: Professional, responsive component library.
- **React Query**: Efficient data fetching and caching.

### Backend

- **NestJS**: Robust Node.js framework for scalable REST APIs.
- **TypeScript**: Shared types and interfaces for backend logic.
- **Sequelize**: ORM for PostgreSQL integration.
- **JWT Authentication**: Secure, role-based access control.
- **Swagger**: Automated API documentation.

### Database

- **PostgreSQL**: Reliable, relational data storage for student records, assessments, and attendance.

### DevOps & Deployment

- **Railway**: Cloud deployment for the backend API and database.
- **Netlify**: Frontend hosting with CI/CD integration.
- **GitHub Actions**: Automated testing and deployment pipelines.
- **Docker**: Containerization for local development and deployment.

### Testing

- **Jest**: Unit and integration testing for backend logic.
- **Cypress** (planned): End-to-end testing for frontend workflows.

### Security & Best Practices

- **CORS Configuration**: Secure cross-origin requests between frontend and backend.
- **Environment Variables**: Secure configuration management for secrets and API endpoints.
- **Role-Based Access**: Instructor/admin separation and secure login.

## 💡 Skills Demonstrated

- Full-stack TypeScript development
- REST API design and documentation
- PostgreSQL schema design and integration
- Authentication and security best practices
- Cloud deployment and CI/CD pipelines
- Responsive UI/UX design
- Debugging and troubleshooting production builds

## ✨ Key Features

- **Student Profiles & Rank Tracking**
- **Assessment & Grading**
- **Attendance Management**
- **Role-Based Access**
- **Responsive Dashboard**
- **API Documentation**
- **Cloud Deployment**

## 🏁 Getting Started

### Prerequisites

- Node.js v14+
- Docker (optional, for containers)
- PostgreSQL (or compatible database)

### Local Installation

```bash
git clone https://github.com/Nerotas/ToughNoseKarate.git
cd ToughNoseKarate

# Backend setup
cd BackEnd
npm install
# configure your .env
npm run dev

# Frontend setup (in a new terminal)
cd FrontEnd
npm install
npm start
```

## 📖 Documentation

- **API Docs:** Visit `/api-docs` on your backend deployment for Swagger documentation.
- **Frontend:** See the [Netlify Demo](https://toughnosekarate.netlify.app) for a live preview.

## 🗣️ Feedback & Contributions

Feedback from instructors and students has been overwhelmingly positive, highlighting the platform’s ease of use and accessibility. Contributions and suggestions are welcome—open an issue or pull request to help improve the project!

---

**Built with passion to support martial arts education and empower every student and instructor.**
