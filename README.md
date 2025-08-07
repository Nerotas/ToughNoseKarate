# ToughNose Karate – Student, Rank & Assessment Web App

## Overview
**ToughNose Karate** is a full-stack application designed to manage student progress, belt rankings, and assessment records for a martial arts academy. It streamlines administrative workflows by providing instructors with tools to track attendance, assessments, and rank advancements in one intuitive platform.

## 🚀 Live Demo
View the live version of the app here:  
[Netlify Demo](https://toughnosekarate.netlify.app)

## 🛠 Tech Stack
- **Frontend**: React + TypeScript, Next.JS
- **Backend**:  NestJS
- **Database**: PostgreSQL (via Sequelize )  
- **Authentication**: JWT
- **DevOps**: CI/CD, Netlify, GitHub Actions  
- **Testing**: Jest, Cypress *planned*

## Key Features
- **Student Profiles & Rank Tracking**: Create and update student profiles with ranking and progress history.
- **Assessment & Grading**: Record evaluations, belt changes, and assessment results.
- **Role-Based Access**: Secure instructor and admin access with SSO or JWT-based login.
- **Responsive Dashboard**: Instructor-friendly layout optimized for desktop and mobile.
- **Deployment**: Hosted on Netlify with Dockerized architecture and continuous integration.

## Getting Started

### Prerequisites
- Node.js v14+
- Docker (optional, if using containers)
- PostgreSQL (or your database of choice)

### Install Locally
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
