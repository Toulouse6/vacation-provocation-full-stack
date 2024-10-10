import supertest from 'supertest';
import { app } from '../src/app';
import { StatusCode } from '../src/3-models/enums';
import { expect } from 'chai';

describe('Testing LikesController', function () {

    let token: string;
    let createdUserId: number = 1;
    let createdVacationId: string = '1';

    before(async () => {
        
        const loginResponse = await supertest(app.server)
            .post('/api/login')
            .send({ email: 'meetollie@gmail.com', password: '12345678' });

        expect(loginResponse.status).to.equal(200);
        token = loginResponse.body.token;
    });

    it('Should check like exists', async function () {
        this.timeout(3000);

        const likesResponse = await supertest(app.server)
            .get(`/api/exists/${createdUserId}/${createdVacationId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(likesResponse.status).to.equal(StatusCode.NotFound);
    });


    // Add like test


    // Remove like test

});
