import { test, expect, Locator } from '@playwright/test';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/forms/SignInForm';
import { SIGNIN_EMPTY_EMAIL, SIGNIN_EMPTY_PASSWORD, SIGNIN_INVALID_EMAIL, SIGNIN_WRONG_DATA } from '../../test-data/constants/errors';
import GaragePage from '../../page-objects/pages/GaragePage';


test.describe(('Setup users'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        await homePage.openPage();
        await homePage.openSignInForm();
    })

    test('Log in and save state - main user', async ({ page }) => {
        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: './test-data/states/userOne.json' });
    });


})



