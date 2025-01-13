import { Locator, Page } from "@playwright/test";

export default class SignInForm {
    readonly form: Page;
    readonly signInButton: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly registrationLink: Locator;

    constructor(page: Page) {
        this.form = page;
        this.signInButton = page.locator('//*[contains(@class, "header_signin")]');
        this.emailField = page.locator('//input[@id="signinEmail"]');
        this.passwordField = page.locator('//input[@id="signinPassword"]');
        this.loginButton = page.locator('//div[@class="modal-content"]//button[@class="btn btn-primary"]');
        this.forgotPasswordLink = page.locator('(//button[contains(@class, "btn-link")])[1]');
        this.registrationLink = page.locator('(//button[contains(@class, "btn-link")])[2]');
    }

    async triggerErrorOnField(fieldName: string) {
        const element = fieldName === 'email' ? this.emailField : this.passwordField;
        await element.focus();
        await element.blur();

    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async submitForm() {
        await this.loginButton.click();
    }

    async clickRegistrationLink() {
        await this.registrationLink.click();
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }

    async loginWithCredentials(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.submitForm();
    }

}