import { expect, Locator, Page } from "@playwright/test";

export default class GaragePage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly addNewCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly submitFormButton: Locator;
    readonly lastAddedCarName: Locator;
    readonly carsList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('//h1[text()="Garage"]');
        this.addNewCarButton = page.locator('//div[@class="panel-page"]//button[contains(@class, "btn-primary")]');
        this.brandDropdown = page.locator('//select[@id="addCarBrand"]');
        this.modelDropdown = page.locator('//select[@id="addCarModel"]');
        this.mileageField = page.locator('//input[@id="addCarMileage"]');
        this.submitFormButton = page.locator('//div[contains(@class, "modal-footer")]/button[contains(@class, "btn-primary")]');
        this.lastAddedCarName = page.locator('(//li//p[@class="car_name h2"])[1]');
        this.carsList = page.locator('//div[contains(@class, "car ")]');
    }

    async openPage() {
        await this.page.goto('/panel/garage');
    }

    async verifyPageIsOpen() {
        await expect(this.pageHeader).toBeVisible();
    }

    async addCarByBrandAndModel(brand: string, model: string) {
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.page.waitForTimeout(300);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill('555');
        await this.submitFormButton.click();
    }

    async getLastAddedCarName(): Promise<string> {
        await this.page.waitForTimeout(300);
        return await this.lastAddedCarName.innerText();
    }

    async removeAllCars() {
        const cars = await this.carsList.all();

        for (let i = 0; i < cars.length; i++) {
            await cars[i].locator('//span[contains(@class, "icon-edit")]').click();
            await this.page.locator('//button[contains(@class, "btn-outline-danger")]').click();
            await this.page.locator('//button[contains(@class, "btn-danger")]').click();

        }
    }

    async removeLastAddedCar() {
        const car = await this.carsList.first();
        await car.locator('//span[contains(@class, "icon-edit")]').click();
        await this.page.locator('//button[contains(@class, "btn-outline-danger")]').click();
        await this.page.locator('//button[contains(@class, "btn-danger")]').click();


    }



}