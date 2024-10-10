import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../src/app';
import path from 'path';
import fs from "fs";

describe('Testing VacationControllers', () => {

    let token: string;
    let createdVacationId: string;
    let userId: number = 4;

    before(async () => {

        const loginResponse = await supertest(app.server)
            .post('/api/login')
            .send({ email: 'meetollie@gmail.com', password: '12345678' })
            .set('x-skip-rate-limit', 'true');

        console.log("Login response status:", loginResponse.status);
        console.log("Login response body:", loginResponse.body);

        expect(loginResponse.status).to.equal(200);
        token = loginResponse.body;
    });


    it('Should return all vacations array', async () => {

        console.log("Using token:", token);
        const vacationsResponse = await supertest(app.server)
            .get('/api/vacations')
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true');

        console.log("Vacations response status:", vacationsResponse.status);
        console.log("Vacations response body:", vacationsResponse.body);

        expect(vacationsResponse.status).to.equal(200);
    });


    it('Should return upcoming vacations array', async () => {

        console.log("Using token:", token);
        const vacationsResponse = await supertest(app.server)
            .get('/api/vacations/upcoming')
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true');

        console.log("Vacations response status:", vacationsResponse.status);
        console.log("Vacations response body:", vacationsResponse.body);

        expect(vacationsResponse.status).to.equal(200);
    });


    it('Should return active vacations array', async () => {

        console.log("Using token:", token);
        const vacationsResponse = await supertest(app.server)
            .get('/api/vacations/active')
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true');

        console.log("Vacations response status:", vacationsResponse.status);
        console.log("Vacations response body:", vacationsResponse.body);

        expect(vacationsResponse.status).to.equal(200);
    });


    it('Should return favorites vacations by user array', async () => {

        console.log("Using token:", token);
        const vacationsResponse = await supertest(app.server)
            .get(`/api/vacations/favorites/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true');

        console.log("Vacations response status:", vacationsResponse.status);
        console.log("Vacations response body:", vacationsResponse.body);

        expect(vacationsResponse.status).to.equal(200);
    });


    it('Should add a new vacation object', async () => {

        const toMySQLDate = (date: Date) => {
            return date.toISOString().split('T')[0];
        };

        let currentDate = new Date();
        let startDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
        let endDate = new Date(startDate.getTime() + (9 * 24 * 60 * 60 * 1000));

        const filePath = path.join(__dirname, '..', 'test-assets', 'vacation-image.jpeg');

        const vacationData = {
            destination: "Test Destination",
            description: "Test Description",
            startDate: toMySQLDate(startDate),
            endDate: toMySQLDate(endDate),
            price: 500
        };

        const vacationResponse = await supertest(app.server)
            .post('/api/vacations')
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true')
            .field('destination', vacationData.destination)
            .field('description', vacationData.description)
            .field('startDate', vacationData.startDate)
            .field('endDate', vacationData.endDate)
            .field('price', vacationData.price.toString())
            .attach('image', fs.readFileSync(filePath), 'vacation-image.jpeg');

        if (vacationResponse.status !== 201) {
            console.error("Failed to create vacation:", vacationResponse.body);
        }

        expect(vacationResponse.status).to.equal(201);
        createdVacationId = vacationResponse.body.id;
    });

    it('Should return a single vacation object', async () => {

        if (!createdVacationId) {
            console.error("No vacation created for editing.");
            return;
        }

        const vacationResponse = await supertest(app.server)
            .get(`/api/vacations/${createdVacationId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true');

        console.log("Vacation response status:", vacationResponse.status);
        console.log("Vacation response body:", vacationResponse.body);

        expect(vacationResponse.status).to.equal(200);
        expect(vacationResponse.body).to.be.an('object');
        expect(vacationResponse.body.id).to.equal(createdVacationId);
    });


    it('Should retrieve an image file', async () => {

        const knownImageName = 'vacation-image.jpeg';

        const response = await supertest(app.server)
            .get(`/api/vacations/images/${knownImageName}`)
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true');

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        expect(response.status).to.equal(200, `Failed to retrieve image, server responded with ${response.status}`);
        expect(response.headers['content-type']).to.match(/image/);
    });


    it('Should edit a vacation object', async () => {

        if (!createdVacationId) {
            console.error("No vacation created for editing.");
            return;
        }

        const toMySQLDate = (date: Date) => {
            return date.toISOString().split('T')[0];
        };

        let currentDate = new Date();
        let startDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
        let endDate = new Date(startDate.getTime() + (9 * 24 * 60 * 60 * 1000));

        const updatedVacationData = {
            destination: "Updated Destination",
            description: "Updated Description",
            startDate: toMySQLDate(startDate),
            endDate: toMySQLDate(endDate),
            price: 800
        };

        const editResponse = await supertest(app.server)
            .put(`/api/vacations/${createdVacationId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true')
            .send(updatedVacationData);

        expect(editResponse.status).to.equal(200);
    });


    it('Should delete a vacation object', async () => {
        if (!createdVacationId) {
            console.error("No vacation created for deleting.");
            return;
        }

        const deleteResponse = await supertest(app.server)
            .delete(`/api/vacations/${createdVacationId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('x-skip-rate-limit', 'true');

        expect(deleteResponse.status).to.equal(204, "Vacation should be deleted successfully");
    });

});

