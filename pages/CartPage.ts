import { test, expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async addFirstItem() {
    const addToCartButton =  this.page.getByRole('button', { name: /Add to cart/i }).first();
    await addToCartButton.click();
  }

  async open() {
    await this.page.locator('.shopping_cart_link').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }

  async removeFirstItem() {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }

  async expectItemVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async expectItemNotVisible(name: string) {
    await expect(this.page.getByText(name)).not.toBeVisible();
  }

};
