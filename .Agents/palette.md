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

## 2026-03-07 — Progress UI for Collectibles

**Learning:** Players need a quick at-a-glance sense of completion for each collectible set without opening individual markers. Progress belongs where discovery decisions happen: in the sidebar and around the popup actions, not in separate overlays.

**Action:** Added per-category `collected/total` badges in the sidebar driven by `UserProgressStore`, and a low-friction \"Mark as collected\" toggle inside each popup. Collected markers are visually de-emphasized on the map (dimmed icons) so remaining tasks pop, while still preserving spatial context.
