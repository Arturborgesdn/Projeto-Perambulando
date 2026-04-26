# Perambulando - Project Guidelines

Welcome to the **Perambulando** project. This document serves as a foundational guide for development, architectural patterns, and coding standards.

## 🛠 Tech Stack
- **Framework:** React 18 (Vite)
- **Routing:** React Router DOM v6
- **Styling:** Vanilla CSS (Single global file)
- **Data Management:** Static mock data using ES Modules

## 📁 Project Structure
- `src/components/`: Reusable UI components (e.g., `Header`, `Footer`, `EventCard`).
- `src/pages/`: Page-level components mapped to routes.
- `src/data/`: Centralized mock data in `data.js`.
- `src/styles/`: Global CSS styling in `style.css`.
- `public/`: Static assets like logos and images.

## 🎨 Styling Conventions
- All styles are maintained in `src/styles/style.css`.
- Use CSS Variables defined in `:root` for colors and common values:
  - `--primary-color`: #007ff5
  - `--secondary-color`: #9c9a9a
  - `--dark-color`: #292F36
  - `--light-color`: #F7FFF7
  - `--text-color`: #4F4F4F
- Font: 'Poppins', sans-serif.

## 🚀 Development Workflow
- **Components:** Use functional components with hooks. Prefer PascalCase for filenames (e.g., `EventCard.jsx`).
- **Data:** To add or modify events, cinemas, or theaters, update `src/data/data.js`.
- **Routing:** Defined in `src/App.jsx`. Use `<Link>` from `react-router-dom` for internal navigation.

## 📝 Standards
- **Naming:** 
  - Components: PascalCase.
  - Constants/Data: camelCase.
  - Routes: kebab-case (e.g., `/eventos-do-dia`).
- **Clean Code:** Ensure components are modular and logic is separated from UI where possible.
- **Images:** Prefer high-quality Unsplash links for mock data or local assets in `public/`.

## 📌 Maintenance Notes
- There is an empty directory `src/{components,pages,data,styles,assets}` that appears to be a leftover from a creation script. It can be safely ignored or removed.
