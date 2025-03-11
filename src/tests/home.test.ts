import { Locator, Page, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';
const { expect } = require('@playwright/test');
import { CREDENTIALS, URLS, ERRORS, SORT_OPTIONS } from '../data/testData'
import { stringify } from 'querystring';

let homePage: HomePage;
let loginPage: LoginPage;

test.describe('Add to Cart Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await page.goto(URLS.LOGIN_PAGE);
        await loginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    });

    // TC007
    // make it more dynamic- not just one item
    test('Add a single product to the cart', async ({ page }: {page:Page}) => {
        // choose a random product. save it in an array to check later that the correct products have been added.
        const chosenProducts : (string | null)[] = [];
        chosenProducts.push(await homePage.addRandomProductToCart());
        const numOfAddedProducts = chosenProducts.length;
        // check the correct number of prodcuts is indicated at the cart icon
        await expect(await homePage.getNumOfProductsInCartIcon()).toEqual(numOfAddedProducts);
        // Verify the product added is the correct product
        // click on the cart icon
        await homePage.openCart();
        // Verify successfull redirection
        await expect(page).toHaveURL(URLS.CART_PAGE)
        // get the cart products name
        const actualProductsInCart: Locator = homePage.getCartProducts();
        // Verify the products names and lists length are equal 
        expect(chosenProducts.length).toEqual(await actualProductsInCart.count())// check length
        // check product by product, and expect the products to be the same (have the same text)
        for(let i=0; i < chosenProducts.length; i++){
            expect(chosenProducts[i]).toBe(await actualProductsInCart.nth(i).textContent());
        }
    });
});
// Deal with nulls
test.describe("Product Sorting Scenarios", () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await page.goto(URLS.LOGIN_PAGE);
        await loginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    });

    test('sort by name A-Z', async ({ page }: {page:Page}) => {

        // Select sorting option on the page
        await homePage.clickSort(SORT_OPTIONS.NAME_A_TO_Z);

        // Get products list after sorting → afterSort
        const afterSort: Locator[] = await homePage.getInventoryProducts();

        // Destructure into an array of names:
        let arrayOfNames: (string | null)[] = await Promise.all(
            afterSort.map((product) => homePage.getItemName(product))
        );                                                                                                                                                                                                                                                             
             
        // sort the array
        let arrayOfNamesSorted = [...arrayOfNames].sort();

        // Verify both arrays are the same
        expect(arrayOfNames).toEqual(arrayOfNamesSorted);


    });
    test('sort by name Z-A', async ({ page }: {page:Page}) => {

        // Select sorting option on the page
        await homePage.clickSort(SORT_OPTIONS.NAME_Z_TO_A);

        // Get products list after sorting → afterSort
        const afterSort: Locator[] = await homePage.getInventoryProducts();

        // Destructure into an array of names:
        let arrayOfNames: string[] = await Promise.all(
            afterSort.map(async (product) => {
                let name = await homePage.getItemName(product)
                if(name === null || name === undefined){
                    console.error('missing product name');
                    return 'missing product';
                }
                return name;
            }));                                                                                                                                                                                                                                                             
        // sort the array
        let arrayOfNamesSorted = arrayOfNames.sort((a,b) => b.localeCompare(a));

        // Verify both arrays are the same
        expect(arrayOfNames).toEqual(arrayOfNamesSorted);
    });

    test('sort by price low to high', async ({ page }: {page:Page}) => {

        // Select sorting option on the page
        await homePage.clickSort(SORT_OPTIONS.PRICE_LOW_TO_HIGH);

        // Get products list after sorting → afterSort
        const afterSort: Locator[] = await homePage.getInventoryProducts();

        // Destructure into an array of prices:
        let arrayOfPrices: number[] = await Promise.all(afterSort.map(async (product) => {
            let price: number = await homePage.getItemPrice(product);
            if(price === 0){
                console.error('price is missing');
                return 0;
            }
            return price!;
        }));     
        // sort the array
        let arrayOfPricesSorted = [...arrayOfPrices].sort();

        // Verify both arrays are the same
        console.log(`arrayOfPrices: ${arrayOfPrices}\narrayOfPricesSorted: ${arrayOfPricesSorted}`);
        expect(arrayOfPrices).toEqual(arrayOfPricesSorted);
    });

    test('sort by price high to low', async ({ page }: {page:Page}) => {

        // Select sorting option on the page
        await homePage.clickSort(SORT_OPTIONS.PRICE_HIGH_TO_LOW);

        // Get products list after sorting → afterSort
        const afterSort: Locator[] = await homePage.getInventoryProducts();

        // Destructure into an array of prices(numbers):
        let arrayOfPrices: number[] = await Promise.all(afterSort.map(async (product) => {
                let price: number = await homePage.getItemPrice(product);
                if(price === 0){
                    console.error('price is missing');
                    return 0;
                }
                return price!;
            }));    
        // sort the array
        let arrayOfPricesSorted = [...arrayOfPrices].sort((a,b) => b-a);

        // Verify both arrays are the same
        expect(arrayOfPrices).toEqual(arrayOfPricesSorted);
    });
});

