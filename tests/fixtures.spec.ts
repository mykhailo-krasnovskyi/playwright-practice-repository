import { expect, Locator, chromium, Page } from '@playwright/test';
import { test } from '../test-data/fixtures/fixtureScreenSizes';

test.describe(('Fixtures'), () => {


    test.beforeEach(async () => {

    })

    test.skip('Open wikipedia without fixtures', async () => {
        //create a browser 
        const browser = await chromium.launch();

        //create a context
        const context = await browser.newContext({ storageState: '' });

        //create a page
        const page = await context.newPage();

        await page.goto('https://www.wikipedia.org/');
        await page.waitForTimeout(2000);

    });

    test('Open wikipedia with fixtures 1', async ({ pageSmall }) => {
        await pageSmall.goto('https://www.wikipedia.org/');
        await pageSmall.waitForTimeout(2000);
    });

    test('Open wikipedia with fixtures 2', async ({ pageMedium }) => {
        await pageMedium.goto('https://www.wikipedia.org/');
        await pageMedium.waitForTimeout(2000);
    });

    test('Open wikipedia with fixtures 3', async ({ pageBig }) => {
        await pageBig.goto('https://www.wikipedia.org/');
        await pageBig.waitForTimeout(2000);
    });

})


