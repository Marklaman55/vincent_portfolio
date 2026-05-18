# Web Hub

A professional, production-ready full-stack web application with integrated frontend and backend.

## Structure
- `src/` - React + Vite + TypeScript frontend (Styled with Tailwind CSS)
- `server.ts` - Express.js backend with SQLite database
- `server/` - Modular backend routes, controllers, and configuration

## Features
- **Full-stack Architecture**: Integrated frontend and backend in one application
- **SQLite Database**: Local database for projects, services, messages, and settings
- **Secure Authentication**: JWT-based admin login with hashed password support
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Admin Dashboard**: Manage projects, services, and messages

## Development
```bash
npm install
npm run dev
```

## Deployment (Render)
1. Push to GitHub
2. Connect to Render as a Web Service
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
