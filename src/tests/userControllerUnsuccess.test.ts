import request from "supertest";
import {server} from "../../server";

describe('Whole unsuccessful API story', () => {
    let createdId: string

    const newUser = {
        username: "John",
        age: 22,
        hobbies: ["run", "jump"]
    }

    const id = '35bb2b7a-0bb7-41d3-b628-199b2e81d4b3'
    test('404 - did not create new user with only username data', async () => {

        const expectedStatusCode = 400;

        const response = await request(server)
            .post('/api/users')
            .send({username: "df"})
        expect(response.status).toEqual(expectedStatusCode);
    });

    test('404 - did not get user with id not in data base', async () => {

        const expectedStatusCode = 404;

        const response = await request(server)
            .get(`/api/users/${id}`)
        expect(response.status).toEqual(expectedStatusCode);
    });

    test('404 - unsuccessful update of user not in data base', async () => {

        const expectedStatusCode = 404;

        const changedInfo = {username: "renamed"}

        const response = await request(server)
            .put(`/api/users/${id}`)
            .send(changedInfo)
        expect(response.status).toEqual(expectedStatusCode);
    });

    test('404 - did not delete user, because his id is not store in data base', async () => {

        const expectedStatusCode = 404;

        const response = await request(server)
            .delete(`/api/users/${id}`)
        expect(response.status).toEqual(expectedStatusCode);
    });

});
