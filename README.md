# The Note Store - Frontend

A modern, responsive web application for managing personal notes. Built with React, TypeScript, and Vite, this frontend provides a seamless user experience for creating, editing, and organizing notes.

## 🚀 Features

- **User Authentication**: Secure Login and Signup pages.
- **Note Dashboard**: A clean interface to view and manage all your notes.
- **CRUD Operations**: Create, Read, Update, and Delete notes in real-time.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **State Management**: Uses React Context API for efficient global state handling.
- **Type Safety**: Built with TypeScript for robust and maintainable code.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: CSS / Vanilla CSS (Modern design patterns)

## 📋 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <https://github.com/Abdurezak-Akmel/The-Note-Store-App-Frontend.git>
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the `frontend` root directory:
    ```env
    VITE_API_BASE_URL=http://localhost:3000/api/v1
    ```

## 🚀 Running the App

### Development Mode
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Production Build
Build the app for production:
```bash
npm run build
```

### Preview Production Build
Locally preview the production build:
```bash
npm run preview
```

## 📂 Project Structure

```text
frontend/
├── public/          # Static assets (icons, images)
├── src/
│   ├── components/  # Reusable UI components
│   ├── context/     # Global state management
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Page-level components
│   ├── routes/      # Routing configuration
│   ├── services/    # API service layers (Axios)
│   ├── App.tsx      # Main application component
│   ├── main.tsx     # Application entry point
│   └── index.css    # Global styles
├── .env             # Environment variables
├── tsconfig.json    # TypeScript configuration
└── vite.config.ts   # Vite configuration
```

## 🛡️ Linting

To maintain code quality, run the linter:
```bash
npm run lint
```

---

Built by [Abdurezak Akmel](https://github.com/Abdurezak-Akmel)
