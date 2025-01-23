import { test, expect, Locator, chromium, Page } from '@playwright/test';
import HomePage from '../page-objects/pages/HomePage';
import SignInForm from '../page-objects/forms/SignInForm';
import GaragePage from '../page-objects/pages/GaragePage';
import { json } from 'stream/consumers';

test.describe(('Garage tests with POM'), () => {
    //  let page: Page;
    test.use({ storageState: './test-data/states/userOne.json' })
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        // const browser = await chromium.launch();
        // const context = await browser.newContext({
        //     storageState: './test-data/states/userOne.json'
        // });
        // page = await context.newPage();

        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);



        // await homePage.openPage();
        // await homePage.openSignInForm();
        // await signInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        await garagePage.openPage();
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




test.describe(('Garage Page for a guest user'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);


    })


    test('Test Session Storage', async ({ page }) => {
        await garagePage.addCarByBrandAndModel('BMW', 'X6');
        expect('BMW X6').toBe(await garagePage.getLastAddedCarName());

        const parsedData = await page.evaluate(async () => {
            return window.sessionStorage.getItem('guestData') ?? '';
        })
        console.log(parsedData);
        const parsedDataObj = JSON.parse(parsedData);
        expect(parsedDataObj.cars[0].id).toBe(1);
    });


    test('Change Session Storage', async ({ page }) => {
        const fakeSessionStorage = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 42,
                    "updatedMileageAt": "2025-01-23T18:01:27.502Z",
                    "carCreatedAt": "2025-01-23T18:01:27.502Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 42
                },
                {
                    "id": 2,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 512,
                    "updatedMileageAt": "2025-01-23T18:01:30.393Z",
                    "carCreatedAt": "2025-01-23T18:01:30.393Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 512
                },
                {
                    "id": 3,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 42,
                    "updatedMileageAt": "2025-01-23T18:01:32.839Z",
                    "carCreatedAt": "2025-01-23T18:01:32.839Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 42
                },
                {
                    "id": 4,
                    "brand": "Ford",
                    "model": "Fusion",
                    "logo": "ford.png",
                    "initialMileage": 42,
                    "updatedMileageAt": "2025-01-23T18:01:39.131Z",
                    "carCreatedAt": "2025-01-23T18:01:39.131Z",
                    "carBrandId": 3,
                    "carModelId": 13,
                    "mileage": 42
                }
            ],
            "nextCarId": 5,
            "nextExpenseId": 1
        };

        await page.goto('/');
        await page.evaluate((data) => {
            window.sessionStorage.setItem('guestData', JSON.stringify(data))
        }, fakeSessionStorage)
        await page.getByText('Guest log in').click();
        await expect(page.locator('//h1[text()="Garage"]')).toBeVisible();



        // await garagePage.addCarByBrandAndModel('BMW', 'X6');
        await page.waitForTimeout(50000);

    });



})

