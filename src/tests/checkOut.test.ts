import { Locator, Page, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CheckOutPage } from '../pages/checkOutPage'
import { log } from 'console';
const { expect } = require('@playwright/test');
import { CREDENTIALS, URLS, ERRORS, CHECKOUT_DETAILS} from '../data/testData'

test.describe("Checkout scenarios", () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let  checkOutPage: CheckOutPage;

    // Before each test, add one item to the cart and open the cart.
    test.beforeEach(async ({page}) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        checkOutPage = new CheckOutPage(page);

        await page.goto(URLS.LOGIN_PAGE); //open the login page
        await loginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD); //login
       
    });
    
// TC009
 test('Complete checkout flow with valid details and products in the cart', async ({ page }: { page: Page }) => {
    // Step : Verify test start on inventory page 
    expect(page).toHaveURL(URLS.INVENTORY_PAGE);
    // Step : Add a random product to  cart
    await homePage.addRandomProductToCart(); //add a product
    // Step : open the cart
    await homePage.openCart(); // open the cart
    // Verify redirection to cart page
    expect(page).toHaveURL(URLS.CART_PAGE);
    // check out
    await checkOutPage.ClickCheckout(); //click the checkout button
    // Verify redirection to check out step 1 (fill in details)
    expect(page).toHaveURL(URLS.CHECK_OUT_STEP_ONE);

    // Step 1: Fill in valid details and proceed to next step
    await checkOutPage.fillInDetails();
    await checkOutPage.clickContinue(); // Continue to the next step
    
    // Step 2: Verify the checkout step two URL
    expect(page).toHaveURL(URLS.CHECK_OUT_STEP_TWO);
    
    // Step 3: Finish the checkout process
    await checkOutPage.clickFinish(); // Finish checkout process
    
    // Step 4: Verify the checkout complete URL
    expect(page).toHaveURL(URLS.CHECK_OUT_COMPLETE);
    
    // Step 5: Go back to inventory page
    await checkOutPage.goBackHome(); // Return to the inventory page
    
    // Step 6: Verify the inventory page URL
    expect(page).toHaveURL(URLS.INVENTORY_PAGE);
});

// TC010- demo failure
test('Checkout with an empty cart', async ({ page }: { page: Page }) => {
    // step 1: open the cart without adding products
    homePage.openCart(); 
    // step 2: click the checkout button
    checkOutPage.ClickCheckout(); 
    // step 3: verify user is not redirected
    expect(page).toHaveURL(URLS.CHECK_OUT_STEP_ONE); //should remain in the same page
    // step 4: verify correct error message is displayed
    expect(await checkOutPage.cartIsEmptyError()).toEqual(ERRORS.CART_IS_EMPTY_ERROR); 
});
});
