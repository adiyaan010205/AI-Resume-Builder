# AI Resume Builder

## Project Overview

The AI Resume Builder is a modern web application designed to simplify and enhance the resume creation process using artificial intelligence. Users can easily input their personal information, experience, education, skills, and projects, and the application will help generate a professional-looking resume. This project focuses on providing a streamlined user experience with a clean UI, built with React on the frontend and Node.js (Express) on the backend, integrated with MongoDB for data persistence.

## Features

*   **Resume Creation & Editing:** Intuitive forms to input and manage all sections of a resume (personal details, experience, education, skills, projects).
*   **Dynamic Previews:** Real-time preview of the resume as data is entered. (Planned feature)
*   **AI Assistance:** (Future integration) Leverage AI to provide suggestions for content, phrasing, and optimization based on target roles or industries.
*   **Template Selection:** (Future integration) Choose from various professional resume templates.
*   **PDF Export:** Generate and download resumes as PDF files.
*   **Theme Toggling:** Switch between light and dark modes for a comfortable user experience.
*   **Robust Backend:** Node.js (Express) API for data management, PDF generation, and future AI integrations.
*   **MongoDB Database:** Secure and scalable data storage for user and resume data.

## Technologies Used

### Frontend
*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Router DOM:** For declarative routing in React applications.
*   **React Hot Toast:** For easy-to-use notifications.
*   **Zustand:** A small, fast, and scalable bear-bones state-management solution (or similar, depending on what's used).

### Backend
*   **Node.js:** JavaScript runtime.
*   **Express.js:** Web framework for Node.js.
*   **MongoDB:** NoSQL database.
*   **Mongoose:** MongoDB object data modeling (ODM) for Node.js.
*   **Bcryptjs:** For password hashing.
*   **jsonwebtoken:** For user authentication (if re-implemented).
*   **Multer:** For handling `multipart/form-data`, primarily for file uploads.
*   **Express-validator:** For request data validation.
*   **Puppeteer / pdf-lib:** For PDF generation.
*   **Google Gemini API:** (Future integration) For AI capabilities.

## Project Structure

The project is divided into three main parts: `client` (frontend), `server` (backend), and `shared` (common constants and types).

```
AI-Resume-Builder/
├── client/
│   ├── public/                 # Static assets (favicons, etc.)
│   │   ├── assets/             # Images, icons specific to client
│   │   ├── src/
│   │   │   ├── assets/             # Images, icons specific to client
│   │   │   ├── components/         # Reusable UI components
│   │   │   │   ├── Layout/         # Header, Sidebar
│   │   │   │   └── UI/             # Buttons, Inputs, Modals, etc.
│   │   │   ├── context/            # React Contexts (ResumeContext, ThemeContext)
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   ├── pages/              # Top-level page components (ResumeBuilder)
│   │   │   ├── services/           # Frontend API service calls
│   │   │   ├── styles/             # Global CSS, Tailwind base
│   │   │   └── utils/              # Frontend utility functions
│   │   ├── index.html              # Main HTML file
│   │   ├── package.json            # Client-side dependencies and scripts
│   │   ├── postcss.config.js       # PostCSS configuration
│   │   ├── tailwind.config.js      # Tailwind CSS configuration
│   │   └── vite.config.js          # Vite build configuration
│   ├── index.html              # Main HTML file
│   ├── package.json            # Client-side dependencies and scripts
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── vite.config.js          # Vite build configuration
├── server/
│   ├── logs/                   # Server logs (if configured)
│   ├── output/                 # Output files (e.g., generated PDFs)
│   ├── src/
│   │   ├── controllers/        # Handle incoming requests, interact with services
│   │   ├── middleware/         # Express middleware (auth, error handling, validation, upload, rate limiting)
│   │   ├── models/             # Mongoose schemas and models
│   │   ├── routes/             # API routes definitions
│   │   ├── services/           # Business logic, interact with models/external APIs
│   │   └── utils/              # Server-side utility functions (config, database, errors, logger)
│   ├── .env                    # Environment variables (MongoDB URI, JWT Secret, API Keys)
│   ├── package.json            # Server-side dependencies and scripts
│   └── server.js               # Main server entry point
└── shared/
    ├── constants/              # Global constants (colors, templates)
    └── types/                  # Shared type definitions (for consistency between client/server)
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   MongoDB (local installation or MongoDB Atlas account)
*   Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AI-Resume-Builder/ai-resume-builder
```

### 2. Backend Setup

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

#### Environment Variables

Create a `.env` file in the `server/` directory and add the following:

```
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster-url>/ai-resume-builder?retryWrites=true&w=majority

# JWT Configuration (for future authentication features)
JWT_SECRET=your-secure-jwt-secret-key

# Google AI Configuration (if integrating AI features)
GEMINI_API_KEY=your-gemini-api-key

# Client URL
CLIENT_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880 # 5MB in bytes
PDF_OUTPUT_DIR=pdfs

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000 # 15 minutes
RATE_LIMIT_MAX=100
```

#### Run the Backend

```bash
npm run dev
```

The server should start on `http://localhost:3001`.

### 3. Frontend Setup

Open a **new terminal tab/window**, navigate to the `client` directory, and install dependencies:

```bash
cd ../client
npm install
```

#### Run the Frontend

```bash
npm run dev
```

The client application should now be running and accessible in your browser at `http://localhost:5173`.

## Usage

Once both the backend and frontend servers are running, you can open your browser to `http://localhost:5173` to start building your resume.
