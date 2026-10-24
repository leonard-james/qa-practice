import { LoginPage } from '../pages/LoginPage';
import { test, expect } from '@playwright/test';

test('TC-001: login with valid credentials', async ({ page }) => {
const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoggedIn();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('TC-002: login with wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrongpass');
    await loginPage.expectLoggedIn();

  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('TC-003: login with empty fields', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});