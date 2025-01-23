import { test as base } from '@playwright/test'
import GaragePage from '../../page-objects/pages/GaragePage';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/forms/SignInForm';

let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

type garagePageTypes = {
    garagePageAsLoggedMainUser: GaragePage;
    garagePageAsLoggedSecondUser: GaragePage;
};

export const test = base.extend<garagePageTypes>({
    garagePageAsLoggedMainUser: async ({ page }, use) => {
        await page.goto('/');
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');

        await use(garagePage);
        await garagePage.removeLastAddedCar();
    },

    garagePageAsLoggedSecondUser: async ({ page }, use) => {
        await page.goto('/');
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials('michael.krasnovskyi+testUserSecond@gmail.com', 'Fsafsafa23');

        await use(garagePage);
        await garagePage.removeLastAddedCar();
    },
})