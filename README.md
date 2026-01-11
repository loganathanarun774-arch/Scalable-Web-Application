# 🚀 Scalable Task Management Dashboard

A premium, high-performance task management application built with **React 19**, **Vite**, and **Tailwind CSS 4**. This project features a stunning glassmorphic dark-themed UI, providing a seamless and productive experience for managing projects and personal tasks.

## ✨ Key Features

- **🔐 Secure Authentication**: Full Login and Registration flow with form validation powered by `zod` and `react-hook-form`.
- **📊 Interactive Dashboard**: A centralized hub to visualize, search, and filter tasks by status (Todo, In-Progress, Completed).
- **📝 Complete Task Management**: Full CRUD capabilities—create, view, edit, and delete tasks with instant UI updates.
- **🎨 Premium UI/UX**: 
  - **Glassmorphism**: Modern frosted-glass components and backdrop blurs.
  - **Dark Mode**: A refined, eye-pleasing dark aesthetic from the start.
  - **Fluid Animations**: Smooth transitions and layout shifts powered by `framer-motion`.
- **👤 Profile Management**: Dedicated user profiles to manage personal information.
- **💾 Persistent State**: Leverages `localStorage` with a service-based architecture for data persistence across sessions.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (with PostCSS)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run in development mode**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 🏗️ Architecture

The app follows a modular architecture:
- `/components`: Reusable UI elements like the glassmorphic `Sidebar`.
- `/context`: Global state management for Authentication.
- `/pages`: Main view components (Dashboard, Login, Profile).
- `/services`: Abstraction layer for API calls and data persistence logic.


