import { expect, test } from '@playwright/test';

test('shows the title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText("Choose Your Own Chatventure")).toBeVisible();
});

test('ping backend', async ({ page }) => {
  await page.goto('/api/ping');
  await expect(page.getByText("ping!")).toBeVisible();
});



