import { expect, Locator, chromium, Page } from '@playwright/test';
import { mergeTests } from '@playwright/test';
import { test } from '../../test-data/fixtures/index';


test.describe(('Garage Page with fixtures'), () => {

    test('Add a car 1', async ({ garagePageAsLoggedMainUser, pageSmall }) => {
        await garagePageAsLoggedMainUser.addCarByBrandAndModel('Ford', 'Fiesta');
        expect('Ford Fiesta').toBe(await garagePageAsLoggedMainUser.getLastAddedCarName());
    });

    test('Add a car 2', async ({ garagePageAsLoggedSecondUser, pageMedium }) => {
        await garagePageAsLoggedSecondUser.addCarByBrandAndModel('Ford', 'Fiesta');
        expect('Ford Fiesta').toBe(await garagePageAsLoggedSecondUser.getLastAddedCarName());
    });

    test('Add a car 3', async ({ garagePageAsLoggedSecondUser, pageBig }) => {
        await garagePageAsLoggedSecondUser.addCarByBrandAndModel('Ford', 'Fiesta');
        expect('Ford Fiesta').toBe(await garagePageAsLoggedSecondUser.getLastAddedCarName());
    });

})


