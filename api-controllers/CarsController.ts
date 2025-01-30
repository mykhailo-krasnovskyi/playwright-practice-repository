import { Request } from "@playwright/test";


export default class CarsController {

    private request;

    constructor(request) {
        this.request = request;
    }

    async getUserCars(cookies: string) {
        const response = await this.request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${cookies}`
            }
        });

        return await response.json();
    }

    async getAllBrands() {
        const response = await this.request.get('/api/cars/brands');
        return await response.json();
    }

    async getAllModels() {
        const response = await this.request.get('/api/cars/models');
        return await response.json();
    }

    async deleteCarById(id: number, cookies: string) {
        const response = await this.request.delete(`/api/cars/${id}`, {
            headers: {
                'Cookie': `sid=${cookies}`
            },

        });
        return await response.json();
    }


    async addCar(brandId: number, modelId: number, mileage: number, cookies: string) {
        const response = await this.request.post(`/api/cars/`,
            {
                data: {
                    "carBrandId": brandId,
                    "carModelId": modelId,
                    "mileage": mileage
                },
                headers: {
                    'Cookie': `sid=${cookies}`
                }
            });
        return await response.json();
    }


}