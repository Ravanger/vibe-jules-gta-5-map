# GTA V Interactive Collectibles & Locations Map

A modern, high-performance interactive map for Grand Theft Auto V collectibles, locations, and points of interest. This project is a refactored and modernized version of the original interactive map, now leveraging a contemporary development stack.

## 🚀 Features

- **Custom Coordinate System:** Accurately maps pixel coordinates to the GTA V in-game grid using a custom Leaflet CRS.
- **Interactive Markers:** Dynamically loaded from structured JSON data (`src/data/markers.json`).
- **Deep Linking:** URL hash integration via `leaflet-hash` for easy sharing of specific map locations.
- **Coordinate Tracking:** Real-time in-game coordinate display via a custom MousePosition control.
- **Image Previews:** Integrated Lightbox2 for viewing in-game screenshots of collectible locations.
- **Modern Tooling:** Migrated from legacy JS/HTML to **Vite** and **TypeScript** for better developer experience and performance.
- **Automated Testing:** Comprehensive suite including unit tests (Vitest) and End-to-End tests (Playwright).

## 🛠️ Tech Stack

### Core
- **[Leaflet](https://leafletjs.com/):** The leading open-source JavaScript library for mobile-friendly interactive maps.
- **[TypeScript](https://www.typescriptlang.org/):** Adds static typing to ensure code reliability and maintainability.
- **[Vite](https://vitejs.dev/):** Next-generation frontend tooling for fast development and optimized builds.

### UI & Utilities
- **[Bootstrap 5](https://getbootstrap.com/):** For responsive UI components.
- **[jQuery](https://jquery.com/):** Supporting legacy interactions and plugins.
- **[Lightbox2](https://lokeshdhakar.com/projects/lightbox2/):** For elegant image overlays.
- **[ClipboardJS](https://clipboardjs.com/):** For easy coordinate link sharing.

### Testing
- **[Vitest](https://vitest.dev/):** Fast unit testing framework.
- **[Playwright](https://playwright.dev/):** Reliable end-to-end testing for modern web apps.

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Building for Production
Create an optimized production build in the `dist/` folder:
```bash
npm run build
```

### Running Tests
- **Unit Tests:** `npm test`
- **E2E Tests:** `npm run test:e2e`

## 🗺️ Roadmap

- [ ] **Data Expansion:** Plan to include all Grand Theft Auto V locations and collectibles (Letter Scraps, Spaceship Parts, Stunt Jumps, etc.).
- [ ] **Filter System:** Improved UI for toggling specific collectible categories.
- [ ] **User Progress Tracking:** LocalStorage or Account-based progress saving for collected items.

## 📜 Credits

- **Original Author:** Created by [Kirill Krasin (Mo45)](https://github.com/Mo45). Original concept and data provided by [RockstarHub.ru](https://rockstarhub.ru).
- **Modernization & Refactor:** This project was extensively refactored, migrated to TypeScript, and modernized with the assistance of **Google Gemini**.

---

*This project is for educational and community purposes. Grand Theft Auto V is a trademark of Rockstar Games.*
