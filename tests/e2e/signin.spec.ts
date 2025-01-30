import { test, expect, Locator } from '@playwright/test';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/forms/SignInForm';
import { SIGNIN_EMPTY_EMAIL, SIGNIN_EMPTY_PASSWORD, SIGNIN_INVALID_EMAIL, SIGNIN_WRONG_DATA } from '../../test-data/constants/errors';

test.describe(('Sign In tests with POM'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        await homePage.openPage();
        await homePage.openSignInForm();
    })


    test.only('C1 Sign In without email', async ({ page }) => {
        await signInForm.triggerErrorOnField('email');
        await expect(page.getByText(SIGNIN_EMPTY_EMAIL)).toBeVisible();
    });

    test('Sign In without password', async ({ page }) => {
        await signInForm.triggerErrorOnField('password');
        await expect(page.getByText(SIGNIN_EMPTY_PASSWORD)).toBeVisible();
    });

    test('Sign In with wrong password/email', async ({ page }) => {
        await signInForm.loginWithCredentials('example@test.com', 'test421412')
        await expect(page.getByText(SIGNIN_WRONG_DATA)).toBeVisible();
    });

    test('Successful Sign In', async ({ page }) => {
        //   await signInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG')
        await expect(page.locator('//h1[text()="Garage"]')).toBeVisible();
    });

    test('Redirection to Restore Access form', async ({ page }) => {
        await signInForm.clickForgotPasswordLink();
        await expect(page.getByRole('heading', { name: 'Restore access' })).toBeVisible();
    });

    test('Redirection to Registration form', async ({ page }) => {
        await signInForm.clickRegistrationLink();
        await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
    });

    test('Sign in with invalid email', async ({ page }) => {
        await signInForm.enterEmail('notvalid');
        await signInForm.triggerErrorOnField('email');
        await expect(page.getByRole('paragraph')).toContainText(SIGNIN_INVALID_EMAIL);
    });

})


test.describe(('Sign In tests without POM'), () => {

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

    test('Redirection to Restore Access form', async ({ page }) => {
        await page.getByRole('button', { name: 'Forgot password' }).click();
        await expect(page.getByRole('heading', { name: 'Restore access' })).toBeVisible();
    });

    test('Redirection to Registration form', async ({ page }) => {
        await page.getByRole('button', { name: 'Registration' }).click();
        await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
    });

    test('Sign in with invalid email', async ({ page }) => {
        await page.getByLabel('Email').fill('testtest');
        await page.getByLabel('Email').blur();
        await expect(page.getByRole('paragraph')).toContainText('Email is incorrect');
    });

})



