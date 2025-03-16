import { Locator, Page } from "playwright";
const { expect } = require('@playwright/test');
import { CHECKOUT_DETAILS} from '../data/testData'


export class CheckOutPage {
    private checkoutBtn: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private zipcodeInput: Locator;
    private continueBtn: Locator;
    private finishBtn: Locator;
    private confiramtionHeader: Locator;
    private backHomeBtn: Locator;
    private cartIsEmptyErrorSelector: Locator;


    constructor(page: Page) {
        // Cart
        this.checkoutBtn = page.getByRole('button', {name: "checkout"});
        // check out step one
        this.firstNameInput = page.getByPlaceholder("First Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.zipcodeInput = page.getByPlaceholder("Zip/Postal Code");
        this.continueBtn = page.locator('#continue');
        this.cartIsEmptyErrorSelector = page.locator('h3', {hasText: "Error: Cart is empty"});//There is no such element of course. I made it up just for the bug report...
        // check out step two
        this.finishBtn = page.locator('button', { hasText: 'finish' });
        // check out completion
        this.confiramtionHeader = page.locator('h2', {hasText: 'Thank you for your order!'});
        this.backHomeBtn = page.locator('button', {hasText: 'Back Home'});

    }
    async fillInDetails(){
       await this.firstNameInput.fill(CHECKOUT_DETAILS.VALID.FIRST_NAME);
       await this.lastNameInput.fill(CHECKOUT_DETAILS.VALID.LAST_NAME);
       await this.zipcodeInput.fill(CHECKOUT_DETAILS.VALID.ZIP_CODE);
       
    }
    async ClickCheckout(): Promise<void>{
        await this.checkoutBtn.click();
    }

    async clickFinish(): Promise<void>{
        await this.finishBtn.click(); //Finish checkout flow
    }

    async clickContinue(): Promise<void>{
        await this.continueBtn.click(); //submit details and continue
    };

    async goBackHome() :Promise<void>{
        await this.backHomeBtn.click();
    }

    async cartIsEmptyError(): Promise<string>{
        const errorMsg = await this.cartIsEmptyErrorSelector.textContent();
        return errorMsg || 'No message was found'; 
    }
}