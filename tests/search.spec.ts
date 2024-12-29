import { test, expect } from '@playwright/test';
let text;

test('getByText', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.getByText('Sign In', { exact: true }).click();
});

test('filters', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.locator('//button', { hasText: 'Sign Up' }).click();
    //  await page.locator('//div', { has: page.locator('//button[@appscrollto="aboutSection"]') }).click();
});

test('locator.locator', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.locator('//nav').locator('//a').click();
});

test('multiple elements', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.getByText('Sign Up').click();
    const inputs = page.locator('//input');
    const inputNumber = await inputs.count();

    for (let i = 0; i < inputNumber; i++) {
        const element = await inputs.nth(i);
        const elements = await inputs.all();
        await element.fill('Test' + i);
    }

});


test('text', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    const elements = page.locator('//nav/button');
    const expectedText = ['About', 'Contacts'];
    const actualText = await elements.allInnerTexts();

});

test('fill', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.getByText('Sign In').click();
    await page.locator('//input[@id="signinEmail"]').fill('Test1');
    await page.locator('//input[@id="signinEmail"]').fill('Test2');
    await page.pause();

});