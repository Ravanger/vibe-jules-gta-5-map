import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('layer control is present', async ({ page }) => {
  await page.waitForSelector('.leaflet-control-layers');
  const control = await page.locator('.leaflet-control-layers');
  await expect(control).toBeVisible();
});

test('layer control lists Playing Card', async ({ page }) => {
  await page.waitForSelector('.leaflet-control-layers-selector');
  const label = await page.locator('.leaflet-control-layers-overlays label span').getByText('Playing Card');
  await expect(label).toBeVisible();
});

test('toggling category updates markers', async ({ page }) => {
  // Wait for markers to load
  await page.waitForSelector('.leaflet-marker-icon');
  const markersBefore = await page.locator('.leaflet-marker-icon').count();
  expect(markersBefore).toBeGreaterThan(0);

  // Find all category checkboxes
  const checkboxes = page.locator('.leaflet-control-layers-overlays input[type="checkbox"]');
  const count = await checkboxes.count();
  
  for (let i = 0; i < count; i++) {
    await checkboxes.nth(i).uncheck();
  }

  // Wait a bit for Leaflet to update DOM
  await page.waitForTimeout(500);

  // Markers should be gone
  const markersAfter = await page.locator('.leaflet-marker-icon').count();
  expect(markersAfter).toBe(0);

  // Check them back
  for (let i = 0; i < count; i++) {
    await checkboxes.nth(i).check();
  }
  await page.waitForTimeout(500);

  const markersRestored = await page.locator('.leaflet-marker-icon').count();
  expect(markersRestored).toBeGreaterThan(0);
});
