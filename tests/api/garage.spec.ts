import { expect, test } from '@playwright/test';
import CarsController from '../../api-controllers/CarsController';
import AuthController from '../../api-controllers/AuthController';
import { USERS } from '../../test-data/creds/users'

test.describe(('Garage Api tests using controllers'), () => {
    let carsController: CarsController;
    let authController: AuthController;
    let sid;

    test.beforeAll(async ({ request }) => {
        authController = new AuthController(request);


        sid = await authController.signInAndGetCookie(USERS.mainUser.email, USERS.mainUser.password)
    })

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
        authController = new AuthController(request);
    })


    test('Get all brands [/api/cars/brands]', async () => {
        const response = await carsController.getAllBrands();
        const allCars = response.data;
        const firstCarTitle = response.data[0].title;
        expect(allCars).toHaveLength(5);
        expect(firstCarTitle).toEqual('Audi');
    });

    test('Get user cars', async () => {
        const response = await carsController.getUserCars(sid);
        const allCars = response.data;
        expect(allCars.length).toBeGreaterThan(3);
    });

    test('Remove last added car', async () => {
        const getCarsResponse = await carsController.getUserCars(sid);
        const lastAddedCarId = getCarsResponse.data[0].id;

        const deleteCarResponse = await carsController.deleteCarById(lastAddedCarId, sid);
        expect(deleteCarResponse.data.carId).toBe(lastAddedCarId);

    });

    test('Remove car by invalid ID', async () => {
        const deleteCarResponse = await carsController.deleteCarById(55555555, sid);
        expect(deleteCarResponse.message).toBe('Car not found');
    });

})
