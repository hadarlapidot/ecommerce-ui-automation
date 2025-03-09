import { Locator, Page } from "playwright";
const { expect } = require('@playwright/test');

export class HomePage {
    page: Page;
    productList: Locator;
    addToCartButton: Locator;
    cartIcon: Locator;
    sortIcon: Locator;
    numOfProductsInCart: Locator;
    inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
        this.addToCartButton = page.locator('.btn_inventory'); //???
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.sortIcon = page.locator('[data-test="product-sort-container"]');
        this.numOfProductsInCart = page.locator('[data-test="shopping-cart-badge"]');
        this.inventoryItems = page.locator('.inventory_item'); //get a static NodeList of div elements
    }

    // Method to add product to cart
    // returns the chosen product name
    async addRandomProductToCart(): Promise<String> {
        let count = await (this.inventoryItems.count()); //number of items displayed in the page
        let rand_num = Math.floor(Math.random() * count) // get a random number between 0 and the list length-1
        const chosenDiv = this.inventoryItems.nth(rand_num); // get the random element
        const button = chosenDiv.locator('button') //get the child button
        button.click() //add to cart
        return await chosenDiv.locator('.inventory_item_name').textContent(); //return the chosen product name
    }

    async openCart() {
        this.cartIcon.click();
    }

    // well written?
    async getCartProductName() {
        return await this.page.locator('.inventory_item_name').textContent();
    }

}

