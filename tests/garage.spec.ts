import { test, expect, Locator } from '@playwright/test';
import HomePage from '../page-objects/pages/HomePage';
import SignInForm from '../page-objects/forms/SignInForm';
import GaragePage from '../page-objects/pages/GaragePage';

test.describe(('Garage tests with POM'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
    })


    test('Add Ford Fiesta', async () => {
        await garagePage.addCarByBrandAndModel('Ford', 'Fiesta');
        expect('Ford Fiesta').toBe(await garagePage.getLastAddedCarName());
    });

    
    test('Add Audi Q7', async () => {
        await garagePage.addCarByBrandAndModel('Audi', 'Q7');
        expect('Audi Q7').toBe(await garagePage.getLastAddedCarName());
    });

    
    test('Add Fiat Ducato', async () => {
        await garagePage.addCarByBrandAndModel('Fiat', 'Ducato');
        expect('Fiat Ducato').toBe(await garagePage.getLastAddedCarName());
    });

    
    test('Add BMW X6', async () => {
        await garagePage.addCarByBrandAndModel('BMW', 'X6');
        expect('BMW X6').toBe(await garagePage.getLastAddedCarName());
    });

})



