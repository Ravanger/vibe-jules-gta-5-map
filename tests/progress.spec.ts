import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('marking a collectible as collected updates sidebar and persists', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');

  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      map.setView([-7490.11, 4282.91], 5);
    }
  });

  await page.waitForTimeout(500);

  const box = await page.locator('#map').boundingBox();
  if (!box) {
    test.skip();
    return;
  }

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2 - 15);

  const popup = page.locator('.leaflet-popup-content');
  await expect(popup).toBeVisible();

  const toggle = popup.locator('[data-progress-toggle]');
  await expect(toggle).toBeVisible();

  const sidebarCountBefore = await page.locator('[data-progress-category="playing_card"]').first().innerText();

  await toggle.click();

  const sidebarCountAfter = await page.locator('[data-progress-category="playing_card"]').first().innerText();
  expect(sidebarCountAfter).not.toEqual(sidebarCountBefore);

  await page.reload();
  await page.waitForSelector('#map');
  await page.waitForSelector('[data-progress-category="playing_card"]');

  const sidebarCountAfterReload = await page.locator('[data-progress-category="playing_card"]').first().innerText();
  expect(sidebarCountAfterReload).toEqual(sidebarCountAfter);
});

test('hiding/showing collected markers via settings', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');

  // Center on a known marker
  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) { map.setView([-7490.11, 4282.91], 5); }
  });
  await page.waitForTimeout(500);

  const box = await page.locator('#map').boundingBox();
  if (!box) return;

  // Click marker to open popup
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2 - 15);
  const toggle = page.locator('[data-progress-toggle]');
  await expect(toggle).toBeVisible();
  
  // Mark as collected
  await toggle.click();
  
  // Close popup by clicking elsewhere
  await page.mouse.click(box.x + 10, box.y + 10);
  await expect(page.locator('.leaflet-popup')).not.toBeVisible();

  // Verify marker is dimmed
  const collectedMarker = page.locator('.marker--collected');
  await expect(collectedMarker).toBeVisible();

  // Click "Hide Found"
  const hideBtn = page.locator('#btn-toggle-collected');
  await expect(hideBtn).toContainText('Hide Found');
  await hideBtn.click();

  // Verify marker is hidden (should not be in the DOM or at least not visible)
  // Our implementation removes it from the LayerGroup
  await expect(collectedMarker).not.toBeVisible();
  await expect(hideBtn).toContainText('Show Found');

  // Reload to test persistence of setting
  await page.reload();
  await page.waitForSelector('#map');
  
  const hideBtnAfter = page.locator('#btn-toggle-collected');
  await expect(hideBtnAfter).toContainText('Show Found');
  await expect(page.locator('.marker--collected')).not.toBeVisible();

  // Toggle back
  await hideBtnAfter.click();
  await expect(page.locator('.marker--collected')).toBeVisible();
});

