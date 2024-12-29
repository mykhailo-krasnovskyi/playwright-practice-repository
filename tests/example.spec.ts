import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
  // await expect(page).toHaveTitle(/Playwright/);
  const button = page.locator('.button');
  console.log(button)
});

test('get started link', async ({ page }) => {
  await test.step('Open the main page', async () => {
    await page.goto('https://playwright.dev/');
  })


  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
