const { test, expect } = require('@playwright/test');
import { Page } from "playwright";
import { CREDENTIALS, URLS, ERRORS } from '../data/testData'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'


test.describe('Login Functionality Scenarios', (page: Page) => {

    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }: {page:Page}) => {
        loginPage = new LoginPage(page);
        await page.goto(URLS.LOGIN_PAGE);
    });
    // TC001
    test('User can login with valid credentials', async ({page}:{page:Page}) => {
        await loginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD); 
        // Expected result: user is redirected to the inventory
        await expect(page).toHaveURL(URLS.INVENTORY_PAGE);
        // Expected result: User is logged in successfully- check there is a logout button (is visible)
        const logoutBtn = await loginPage.logoutBtn();
        await expect(logoutBtn).toHaveCount(1);

    });
    // TC002
    // assertions should be in tests file
    test('User cannot login with invalid username', async () => {
        await loginPage.login(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD); 
        // assert correct error message is displayed
        await expect(await loginPage.err_msg()).toBe(ERRORS.BAD_CREDENTIALS);
    });
    // TC003
    test('User cannot login with invalid password', async () => {
        await loginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD); 
        await expect(await loginPage.err_msg()).toBe(ERRORS.BAD_CREDENTIALS);
    });

    // TC004
    test('Login with empty fields (username and password)', async () => {
        await loginPage.login('',''); 
        // assert correct error message is displayed
        await expect(await loginPage.err_msg()).toBe(ERRORS.MISSING_USERNAME);
    });
    // TC005
    test('Login with empty username', async () => {
        await loginPage.login('',CREDENTIALS.VALID_USER.PASSWORD); 
        // assert correct error message is displayed
        await expect(await loginPage.err_msg()).toBe(ERRORS.MISSING_USERNAME);
    });
    // TC006
    test('Login with empty password', async () => {
        await loginPage.login(CREDENTIALS.VALID_USER.USERNAME,''); 
        // assert correct error message is displayed
        await expect(await loginPage.err_msg()).toBe(ERRORS.MISSING_PASSWORD);
    });
});

