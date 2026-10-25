import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test('TC-006: Add one item to the cart', async ({ page }) => {
  // Log in 
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoggedIn();

  await cartPage.addFirstItem();
  await cartPage.open();
  await cartPage.expectItemVisible('Sauce Labs Backpack');

});

test('TC-012: remove an item', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/inventory.html');  

  
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoggedIn();

  const cartPage = new CartPage(page);
  await cartPage.addFirstItem();
  await cartPage.open();
  await cartPage.expectItemVisible('Sauce Labs Backpack');

  await cartPage.removeFirstItem();
  await cartPage.expectItemNotVisible('Sauce Labs Backpack');

});