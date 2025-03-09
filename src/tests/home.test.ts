import { Page, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';
const { expect } = require('@playwright/test');
import { CREDENTIALS, URLS, ERRORS } from '../data/testData'


test.describe('Add to Cart Scenarios', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await page.goto(URLS.LOGIN_PAGE);
        await loginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    });

    // TC007
    // make it more dynamic- not just hard coded example
    test('Add a single product to the cart', async ({ page }: {page:Page}) => {
        // choose a random product. save it somehow to check later that the correct product has been added.
        const chosenProduct : String = await homePage.addRandomProductToCart();
        await expect(homePage.numOfProductsInCart).toBeVisible;
        await expect(homePage.numOfProductsInCart).toHaveText('1');
        // Verify the product added is the correct product
        // click on the cart icon
        await homePage.openCart();
        await expect(page).toHaveURL(URLS.CART_PAGE)
        // get the product name
        const cartProductName = await homePage.getCartProductName();
        // Verify the products name are equal
        expect(chosenProduct).toBe(cartProductName);
    });

    test('Add multiple products to the cart', async () => {
        await expect(homePage.productList).toBeVisible();
    });
});
