# HOWTO: Converting Dumped Data for the Map App

This guide explains how to take locations from `gta-v-locations.json` and convert them into a format compatible with our map application.

## Prerequisites

- `gta-v-locations.json`: The categorized data dump.
- `map_converter.cjs`: The coordinate transformation utility.
- `src/utils/extract_data.cjs`: The primary automated extraction utility.

## Automated Conversion Process

The project includes a robust extraction script that automates the conversion and registration of all 67+ categories.

### 1. Run the Extraction Utility

Ensure you have the latest `gta-v-locations.json` in the `/data/` directory, then run:

```bash
node src/utils/extract_data.cjs
```

This script will:
1. Parse the categorized dump.
2. Convert geographic coordinates to the app's pixel grid.
3. Apply standard popup HTML templates (including GLightbox support).
4. Map categories to their respective high-quality SVG icon IDs.
5. Generate individual JSON files in `src/data/[group]/`.
6. Auto-generate `src/data/categories.ts` with all required imports and metadata.

### 2. Manual Customization (Advanced)

If you need to manually add a new category or customize an existing one, update the `ICON_MAPPING` object in `src/utils/extract_data.cjs` to link your category slug to a valid `iconId` from `src/data/icons.ts`.

```javascript
const ICON_MAPPING = {
    // slug: iconId
    'new_category': 'appropriate_icon_id',
    // ...
};
```

## Category Definition Structure

The modernized `CategoryDefinition` interface (in `src/types.ts`) is designed for consistency:

```typescript
export interface CategoryDefinition {
  id: string;
  name: string;
  group: CategoryGroup;
  iconId?: string; // Optional: Links to path in src/data/icons.ts
  color?: string;  // Optional: Custom color for the SVG pin
  markers: MarkerData[];
  visible: boolean;
}
```

## Coordinate System Note

- **Source (Dump):** Geographic Latitude/Longitude (Mercator).
- **App:** Custom pixel-based `L.CRS.Simple` (0 to -8192).
- **Conversion:** Always use `geographicToApp(lat, lng)` from `map_converter.cjs` in your scripts to ensure alignment.
