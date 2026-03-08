# Palette 🎨 Journal — GTA 5 Map App

Critical UX/accessibility learnings only.

---

## 2026-03-07 — Copy Button Needs Visual Feedback

**Learning:** The marker popups contain a clipboard copy button with only a `title` attribute and no visible feedback on click. `title` is not reliably exposed by screen readers, and without an `aria-label`, icon-only buttons are completely opaque to assistive technology. Additionally, ClipboardJS fires a `success` event — this can be leveraged to show a brief "Copied!" status without any dependencies.

**Action:** Use `ClipboardJS`'s `success` event to swap the button text/icon for "✓ Copied!" momentarily. Add `aria-label="Copy location coordinates"` and `aria-live="polite"` so screen readers announce the copy success.

---

## 2026-03-07 — UI Overhaul: Custom Sidebar & Grouped Categories

**Learning:** Replacing the default Leaflet layers control with a custom sidebar allowed for much better grouping and a cleaner, more modern look. Users want to quickly hide/show logical groups (Locations, Collectibles, etc.) and filter through many categories easily. Glassmorphism and dark mode fit the GTA aesthetic perfectly while improving contrast for text.

**Action:** Built a custom `LayerSidebar.ts` using TypeScript and Tailwind to manage category visibility. Implemented "Show All" and "Hide All" at both global and group levels. Replaced the generic checkboxes with high-visual-feedback custom inputs that change color based on the category group's theme.

---

## 2026-03-08 — Streamlining Sidebar Category Items

**Learning:** Having both a color dot (checkbox replacement) on the left and a toggle slider on the right of each category was redundant and cluttered the UI. Removing the left-side dot allows the category name to have more horizontal space, which is especially beneficial for longer category names on narrow viewports. The toggle slider alone is sufficient for indicating visibility.

**Action:** Removed the `cat-check` color dot from `CategoryItem.tsx` and simplified the layout to maximize the category name text area.
