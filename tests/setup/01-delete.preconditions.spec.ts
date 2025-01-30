import { expect, test } from '@playwright/test';
import CarsController from '../../api-controllers/CarsController';
import AuthController from '../../api-controllers/AuthController';
import { USERS } from '../../test-data/creds/users'

test.describe(('Delete - Preconditions for regression run'), () => {
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


    test('Remove all user cars', async () => {
        const getCarsResponse = await carsController.getUserCars(sid);
        const allCars = getCarsResponse.data;

        for (let i = 0; i < allCars.length; i++) {
            const deleteCarResponse = await carsController.deleteCarById(allCars[i].id, sid);
            expect(deleteCarResponse.data.carId).toBe(allCars[i].id);
            console.log(`Deleted car with id ${JSON.stringify(allCars[i].id)}, ${allCars.length - (i + 1)} cars remain`)
        }
    });
})
