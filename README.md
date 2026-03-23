# Academic Portfolio Website

A modern, responsive academic portfolio website built with React, Vite, and Tailwind CSS. This project is aimed at researchers, PhD candidates, and academics who want to showcase their publications, experience, education, and conferences in a clean, professional format.

## Technologies Used

- **React 18** - Frontend JavaScript library
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS v4** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Unstyled, accessible components
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful and consistent icons

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

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
   *(or `npm i`)*

### Development Server

To start the local development server:

```bash
npm run dev
```

This will run the generic Vite server (usually on `http://localhost:5173`). Open this URL in your browser to view the portfolio.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist` (or `build`) folder containing the optimized static files that can be deployed to any static hosting provider (e.g., GitHub Pages, Vercel, Netlify).

## Project Structure

- `src/components/`: Contains all the React components used to build the UI (Hero, Experience, Education, etc.).
- `src/data/`: Contains TypeScript files where all the portfolio data is stored.
- `src/index.css`: Global styles and Tailwind configuration.
- `src/App.tsx`: The main application component that ties all sections together.

## Customization

Please refer to the `Guidelines.md` file in the root directory for detailed instructions on how to customize the data, layout, and design of this portfolio.

## Credits & Ownership

- **Owner**: Copyright © 2026 Tyseer Ninad. All rights reserved.
- **Developer**: Md. Rezwan Zani ([rezwanzani.me](https://rezwanzani.me)). Adapted and customized for Tyseer Ninad.
- **Base Design**: Original UI design by [Ashish Gautam](https://www.figma.com/community/file/1535220348867490165), licensed under CC BY 4.0.
- **Source Code**: [GitHub Repository](https://github.com/RezwanZani/academic-portfolio)

## License

This project is intended for personal portfolio use. See `Attributions.md` for information regarding third-party components and assets.