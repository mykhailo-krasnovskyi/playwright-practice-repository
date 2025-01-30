import { expect, test } from '@playwright/test';
import { USERS } from '../../test-data/creds/users';

test.describe(('Api tests'), () => {


    test('Get all brands [/api/cars/brands]', async ({ request }) => {
        const response = await request.get('/api/cars/brands');
        const body = await response.json();

        console.log(response);
        console.log('----------------------');
        console.log(body);
        console.log('----------------------');

        const allCars = body.data;
        const carTitle = allCars[0].title;

        expect(allCars).toHaveLength(5);
        expect(carTitle).toEqual('Audi');
    });

    test('Log in as a user [/api/auth/signin] 1', async ({ request }) => {
        console.log('-----------------STORAGE STATE1----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE1----------------:');

        const response = await request.post('/api/auth/signin', {
            data: {
                "email": USERS.mainUser.email,
                "password": USERS.mainUser.password,
            },
        });

        const body = await response.json();
        console.log(body);

        console.log('-----------------STORAGE STATE2----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE2----------------:');
        expect(body.data.userId).toBeDefined();
    });
})


test.describe('API with auth in beforeEach', async () => {
    test.beforeEach(async ({ request }) => {
        const response = await request.post('/api/auth/signin', {
            data: {
                "email": USERS.mainUser.email,
                "password": USERS.mainUser.password,
            },
        });
    })

    test('Get all user cars [/api/cars] 1', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');
        const response = await request.get('/api/cars');
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 2', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');
        const response = await request.get('/api/cars');
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 3', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');
        const response = await request.get('/api/cars');
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 4', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');
        const response = await request.get('/api/cars');
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 5', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');
        const response = await request.get('/api/cars');
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 6', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');
        const response = await request.get('/api/cars');
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

})



test.describe('API with auth in beforeAll', async () => {

    let sidValueGlobal;

    test.beforeAll(async ({ request }) => {
        const response = await request.post('/api/auth/signin', {
            data: {
                "email": USERS.mainUser.email,
                "password": USERS.mainUser.password,
            },
        });

        const sidCookie = await response.headers()['set-cookie'];
        const sidValue = sidCookie.split(';')[0].split('=')[1];
        sidValueGlobal = sidValue;


        console.log(sidValue);

    });

    test('Get all user cars [/api/cars] 1', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 2', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 3', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });

    test('Get all user cars [/api/cars] 4', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });
    test('Get all user cars [/api/cars] 5', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });
    test('Get all user cars [/api/cars] 6', async ({ request }) => {
        console.log('-----------------STORAGE STATE----------------:');
        console.log(await request.storageState());
        console.log('-----------------STORAGE STATE----------------:');

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(3);
    });


})


