import { expect, test } from '@playwright/test';
import CarsController from '../../api-controllers/CarsController';
import AuthController from '../../api-controllers/AuthController';
import { USERS } from '../../test-data/creds/users'

test.describe(('Create - Preconditions for regression run'), () => {
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

    test('Add 3 default cars', async () => {
        const cars = [{
            "carBrandId": 4,
            "carModelId": 16,
            "mileage": 911
        },
        {
            "carBrandId": 4,
            "carModelId": 16,
            "mileage": 911
        },
        {
            "carBrandId": 3,
            "carModelId": 14,
            "mileage": 911
        }
        ]

        for (let i = 0; i < cars.length; i++) {
            const createCarResponse = await carsController.addCar(cars[i].carBrandId, cars[i].carModelId, cars[i].mileage, sid);
            expect(createCarResponse.data.carBrandId).toBe(cars[i].carBrandId);
            expect(createCarResponse.data.carModelId).toBe(cars[i].carModelId);
            expect(createCarResponse.data.mileage).toBe(cars[i].mileage);
        }

    });
})
