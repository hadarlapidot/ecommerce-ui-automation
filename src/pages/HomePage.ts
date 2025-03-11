import { Locator, Page } from "playwright";
const { expect } = require('@playwright/test');
import { SORT_OPTIONS } from '../data/testData'

export class HomePage {
    private page: Page;
    private productList: Locator;
    private addToCartButton: Locator;
    private cartIcon: Locator;
    private sortIcon: Locator;
    private numOfProductsInCartIcon: Locator;
    private inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
        this.addToCartButton = page.locator('.btn_inventory'); //???
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.sortIcon = page.locator('[data-test="product-sort-container"]');
        this.numOfProductsInCartIcon = page.locator('[data-test="shopping-cart-badge"]');
        this.inventoryItems = page.locator('.inventory_item'); //get a static NodeList of div elements
    }

    // Method to add product to cart
    // returns the chosen product name
    async addRandomProductToCart() : Promise<string | null>{
        let count = await (this.inventoryItems.count()); //number of items displayed in the page
        let rand_num = Math.floor(Math.random() * count) // get a random number between 0 and the list length-1
        const chosenDiv = this.inventoryItems.nth(rand_num); // get the random element
        const button = chosenDiv.getByRole('button') //get the child button
        await button.click() //add to cart
        return await chosenDiv.locator('.inventory_item_name').textContent(); //return the chosen product name
    }

    async openCart() {
        await this.cartIcon.click();
    }

    // well written?
    // what if there is more then one item?
    getCartProducts() {
        // get the list of items in the cart
        return this.page.locator('.inventory_item_name'); //returns a list of references
    }

    async getNumOfProductsInCartIcon(): Promise<Number> {
        return Number(await this.numOfProductsInCartIcon.textContent());
    }
    async clickSort(option: string): Promise<void> {
        await this.page.selectOption('[data-test="product-sort-container"]', {value: option});
    }
    /**
     * Retrieves all inventory products as locators.
     * 
     * This method collects all inventory items and returns them as an array of locators.
     * The locators are used later for checking the order and sorting the items by their properties (name amd price).
     * 
     * @returns {Promise<Locator[]>} An array of locators representing the inventory products.
     */
    async getInventoryProducts(): Promise<Locator[]>{
        // get the number of items
        const num_of_products = await this.inventoryItems.count();
        let inventory_products: Locator[] = [];
        for(let i=0; i<num_of_products; i++) {
            inventory_products.push(this.inventoryItems.nth(i));
        }
        return inventory_products;
    }

    async getItemName(item: Locator): Promise<string | null> {
        let name = await item.locator('[data-test="inventory-item-name"]').textContent() || '';
        console.log(name);
        return name;
    };
    // FIX: returns '9.99$'! Get rid of '$'
    async getItemPrice(item: Locator): Promise<number> {
        let fullText: string | null= await item.locator('[data-test="inventory-item-price"]').textContent();
        const price = fullText?.match(/\d+\.\d+/);
        console.log(price);
        if(price)
            return parseFloat(price[1]);
        return 0
    }
}

