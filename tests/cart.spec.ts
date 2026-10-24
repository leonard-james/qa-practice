import { test, expect } from '@playwright/test';

test('TC-006: add one item to cart', async ({ page }) => {
  // Log in
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);

  // Add the backpack (first item in the default A-Z sort)
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // The button changes to Remove
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();

  // Open the cart
  await page.getByRole('button', { name: /^Cart/ }).click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});