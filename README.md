# Academic Portfolio Website

A modern, responsive academic portfolio website built with React, Vite, Tailwind CSS, and Firebase. This project is aimed at researchers, PhD candidates, and academics who want to showcase their publications, experience, education, and conferences in a clean, professional format, fully manageable via a secure admin dashboard.

## Technologies Used

- **React 18** - Frontend JavaScript library
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS v4** - Utility-first CSS framework for rapid UI development
- **Firebase** - Backend as a Service for Authentication and Firestore Database
- **React Hook Form** - Form state management for the admin dashboard
- **Radix UI & Framer Motion** - Accessible components and animations
- **Lucide React** - Beautiful and consistent icons

## Getting Started

### Prerequisites

1. Ensure you have Node.js installed on your machine.
2. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/). Enable **Authentication (Email/Password)** and **Firestore Database**.

### Installation

1. Clone the repository or extract the project bundle.
2. Navigate to the project directory:
   ```bash
   cd academic-portfolio
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Configure Firebase:
   - Create a `.env` file in the root directory and add your Firebase credentials:
     ```env
     VITE_FIREBASE_API_KEY="your_api_key"
     VITE_FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
     VITE_FIREBASE_PROJECT_ID="your_project_id"
     VITE_FIREBASE_STORAGE_BUCKET="your_project_id.appspot.com"
     VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
     VITE_FIREBASE_APP_ID="your_app_id"
     ```
   - Log in to Firebase CLI and deploy the strict security rules:
     ```bash
     npx firebase login
     npx firebase deploy --only firestore:rules
     ```

### Development Server

To start the local development server:

```bash
npm run dev
```

This will run the server (usually on `http://localhost:5173`). 

### Initial Setup

Once the server is running, you **must** navigate to `/admin-setup` to create your administrator account. This page securely locks down your database after the first use, preventing anyone else from claiming ownership.

After setup, you can log in at `/login` to access your Dashboard and populate your portfolio data.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `build` folder containing the optimized static files that can be deployed to any static hosting provider (e.g., Firebase Hosting, Vercel, Netlify).

## Project Structure

- `src/components/`: Contains public-facing React UI components (Hero, Experience, Education, etc.).
- `src/pages/dashboard/`: Contains the protected Admin Dashboard forms for managing data.
- `src/contexts/`: Manages global state including Authentication and Portfolio Data Caching.
- `src/data/`: Contains static `.json` fallback data used for instant hydration or default placeholders.
- `firestore.rules`: Critical security rules that lock down the backend architecture.

## Customization & Management

Please refer to the `Guidelines.md` file in the root directory for detailed instructions on how to use the dashboard, and how to customize the layout and design of this portfolio.

## Credits & Ownership

- **Owner**: Copyright © 2026 Tyseer Ninad. All rights reserved.
- **Developer**: Md. Rezwan Zani ([rezwanzani.me](https://rezwanzani.me)). Adapted and customized for Tyseer Ninad.
- **Base Design**: Original UI design by [Ashish Gautam](https://www.figma.com/community/file/1535220348867490165), licensed under CC BY 4.0.
- **Source Code**: [GitHub Repository](https://github.com/RezwanZani/academic-portfolio)

## License

This project is intended for personal portfolio use. See `Attributions.md` for information regarding third-party components and assets.