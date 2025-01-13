import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('//*[contains(@class, "header_signin")]');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }

    async openPage() {
        await this.page.goto('/');
    }

}