import request from "supertest";
import {server} from "../../server";

describe('Work with invalid id', () => {

    const id = 122323

    const expectedStatusCode = 400;


    test('400 - did not get user with invalid id', async () => {

        const response = await request(server)
            .get(`/api/users/${id}`)
        expect(response.status).toEqual(expectedStatusCode);
    });

    test('400 - did not update user with invalid id', async () => {

        const expectedStatusCode = 400;

        const changedInfo = {username: "renamed"}

        const response = await request(server)
            .put(`/api/users/${id}`)
            .send(changedInfo)
        expect(response.status).toEqual(expectedStatusCode);
    });

    test('400 - delete created user', async () => {

        const response = await request(server)
            .delete(`/api/users/${id}`)
        expect(response.status).toEqual(expectedStatusCode);
    });

});
