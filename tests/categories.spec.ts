import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('layer control is present', async ({ page }) => {
  await page.waitForSelector('.leaflet-control-layers');
  const control = await page.locator('.leaflet-control-layers');
  await expect(control).toBeVisible();
});

test('layer control lists Playing Cards', async ({ page }) => {
  await page.waitForSelector('.leaflet-control-layers-selector');
  const label = await page.locator('.leaflet-control-layers-overlays label span').getByText('Playing Cards');
  await expect(label).toBeVisible();
});

test('toggling category updates markers', async ({ page }) => {
  // Wait for markers to load
  await page.waitForSelector('.leaflet-marker-icon');
  const markersBefore = await page.locator('.leaflet-marker-icon').count();
  expect(markersBefore).toBeGreaterThan(0);

  // Find the checkbox for Playing Cards
  // Note: The structure is typically <label> <input type="checkbox"> <span>Name</span> </label>
  const checkbox = await page.locator('.leaflet-control-layers-overlays label:has-text("Playing Cards") input[type="checkbox"]');
  
  // Uncheck it
  await checkbox.uncheck();

  // Wait a bit for Leaflet to update DOM
  await page.waitForTimeout(500);

  // Markers should be gone
  const markersAfter = await page.locator('.leaflet-marker-icon').count();
  expect(markersAfter).toBe(0);

  // Check it back
  await checkbox.check();
  await page.waitForTimeout(500);

  const markersRestored = await page.locator('.leaflet-marker-icon').count();
  expect(markersRestored).toBe(markersBefore);
});
