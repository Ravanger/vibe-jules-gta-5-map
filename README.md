# GTA V Interactive Collectibles & Locations Map

A modern, high-performance interactive map for Grand Theft Auto V collectibles, locations, and points of interest. This project is a refactored and modernized version of the original interactive map, now leveraging a contemporary development stack.

## 🚀 Features

- **Custom Coordinate System:** Accurately maps pixel coordinates to the GTA V in-game grid using a custom Leaflet CRS.
- **Marker Categories & Filtering:** Support for multiple collectible categories (e.g., Playing Cards, Ammu-Nation) with a built-in Leaflet Layer Control for easy toggling.
- **Extensible Data Pattern:** Easily add new categories by creating a JSON file in `src/data/categories/` and registering it in `src/data/categories.ts`.
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
- **[Tailwind CSS](https://tailwindcss.com/):** For utility-first responsive styling.
- **[GLightbox](https://biati-digital.github.io/glightbox/):** Modern, dependency-free lightbox for image overlays.
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

## 📂 Data Structure & Extraction

The project now uses a categorized data structure in `src/data/`. To manage the large amount of GTA V data, we use an automated extraction utility:

1. **Raw Data:** Store raw JSON dumps in the root `/data/` directory.
2. **Extraction Script:** Run `node src/utils/extract_data.cjs` to:
   - Parse the raw dumps.
   - Convert geographic coordinates to the app-specific grid.
   - Generate individual category JSON files in `src/data/[group]/`.
   - Auto-generate `src/data/categories.ts` with all required imports and definitions.

## 🗺️ Roadmap

- [x] **Filter System:** Integrated Leaflet Layer Control for toggling specific collectible categories.
- [x] **Data Expansion:** Automated processing for all 67+ categories including Letter Scraps, Spaceship Parts, etc.
- [ ] **UI/UX Improvements:** Enhance the map interface with modern aesthetics, smooth animations, and a more intuitive filtering experience.
- [ ] **User Progress Tracking:** LocalStorage or Account-based progress saving for collected items.

## 📜 Credits

- **Original Author:** Created by [Kirill Krasin (Mo45)](https://github.com/Mo45). Original concept and data provided by [RockstarHub.ru](https://rockstarhub.ru).
- **Original Repository:** [Mo45/gta5-player-cards-map](https://github.com/Mo45/gta5-player-cards-map)
- **Modernization & Refactor:** This project was extensively refactored, migrated to TypeScript, and modernized with the assistance of **Google Gemini**.

---

*This project is for educational and community purposes. Grand Theft Auto V is a trademark of Rockstar Games.*
