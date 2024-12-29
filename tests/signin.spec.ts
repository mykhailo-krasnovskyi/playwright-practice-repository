import { test, expect, Locator } from '@playwright/test';


test.describe(('Sign In tests'), () => {

    let signInButton: Locator;
    let emailField: Locator;
    let passwordField: Locator;
    let loginButton: Locator;

    test.beforeEach(async ({ page }) => {
        signInButton = page.locator('//*[contains(@class, "header_signin")]');
        emailField = page.locator('//input[@id="signinEmail"]');
        passwordField = page.locator('//input[@id="signinPassword"]');
        loginButton = page.locator('//div[@class="modal-content"]//button[@class="btn btn-primary"]');
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await signInButton.click();

    })


    test('Sign In without email', async ({ page }) => {
        await emailField.focus();
        await emailField.blur();
        await expect(page.getByText('Email required')).toBeVisible();
    });

    test('Sign In without password', async ({ page }) => {
        await passwordField.focus();
        await passwordField.blur();
        await expect(page.getByText('Password required')).toBeVisible();
    });

    test('Sign In with wrong password/email', async ({ page }) => {
        await emailField.fill('example@test.com');
        await passwordField.fill('test421412');
        await loginButton.click();
        await expect(page.getByText('Wrong email or password')).toBeVisible();
    });

    test('Successful Sign In', async ({ page }) => {
        await emailField.fill('michael.krasnovskyi+testUser1@gmail.com');
        await passwordField.fill('ZSgeVQhuU3qkvlG');
        await loginButton.click();
        await expect(page.locator('//h1[text()="Garage"]')).toBeVisible();
     //   await expect(page).toHaveScreenshot('garage-page.png');
        await expect(page.locator('//*[@class="car-item"]')).toHaveScreenshot('car.png')
    });

})


