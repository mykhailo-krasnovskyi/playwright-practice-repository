import { Locator, Page } from "@playwright/test";

export default class GaragePage {
    readonly page: Page;
    readonly addNewCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly submitFormButton: Locator;
    readonly lastAddedCarName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNewCarButton = page.locator('//div[@class="panel-page"]//button[contains(@class, "btn-primary")]');
        this.brandDropdown = page.locator('//select[@id="addCarBrand"]');
        this.modelDropdown = page.locator('//select[@id="addCarModel"]');
        this.mileageField = page.locator('//input[@id="addCarMileage"]');
        this.submitFormButton = page.locator('//div[contains(@class, "modal-footer")]/button[contains(@class, "btn-primary")]');
        this.lastAddedCarName = page.locator('(//li//p[@class="car_name h2"])[1]');
    }

    async openPage() {
        await this.page.goto('/panel/garage');
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

}