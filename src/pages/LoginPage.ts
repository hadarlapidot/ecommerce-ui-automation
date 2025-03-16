import { Locator, Page } from "playwright";
import except from '@playwright/test';

export class LoginPage {

    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;
    private menuBtn: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
        this.menuBtn = page.locator('#react-burger-menu-btn')
    }

    public async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // getters
    async err_msg(): Promise<string | null> {
        return this.errorMessage.textContent();
    }
    async logoutBtn(): Promise<Locator>{
        return this.page.locator('#logout_sidebar_link')
    }; 

}

