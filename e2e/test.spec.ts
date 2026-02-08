import { expect, test } from '@playwright/test';

test('shows the title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText("Choose Your Own Chatventure")).toBeVisible();
});


