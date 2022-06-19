import {server} from "../../server";
import request from 'supertest';

describe('Whole success API story', () => {
  let createdId: string

  const newUser = {
    username: "John",
    age: 22,
    hobbies: ["run", "jump"]
  }

  test('200 - get all users', async () => {

    const expectedStatusCode = 200;
    const expectedResponse: [] = []

    const response = await request(server)
        .get('/api/users')
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedResponse);
  });

  test('201 - create new user with all data', async () => {

    const expectedStatusCode = 201;

    const response = await request(server)
        .post('/api/users')
        .send(newUser)
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.username).toEqual(newUser["username"]);
    expect(response.body.age).toEqual(newUser["age"]);
    expect(response.body.hobbies).toEqual(newUser["hobbies"]);
    createdId = response.body.id
  });

  test('200 - get created user by Id', async () => {

    const expectedStatusCode = 200;

    const response = await request(server)
        .get(`/api/users/${createdId}`)
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual({id: createdId, ...newUser});
  });

  test('200 - update created user with name', async () => {

    const expectedStatusCode = 200;

    const changedInfo = {username: "renamed"}

    const response = await request(server)
        .put(`/api/users/${createdId}`)
        .send(changedInfo)
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.username).toEqual(changedInfo.username);
    expect(response.body.age).toEqual(newUser.age);
    expect(response.body.hobbies).toEqual(newUser.hobbies);
    expect(response.body.id).toEqual(createdId);
  });

  test('204 - delete created user', async () => {

    const expectedStatusCode = 204;

    const response = await request(server)
        .delete(`/api/users/${createdId}`)
    expect(response.status).toEqual(expectedStatusCode);
  });

  test('404 - get deleted user', async () => {

    const expectedStatusCode = 404;

    const response = await request(server)
        .delete(`/api/users/${createdId}`)
    expect(response.status).toEqual(expectedStatusCode);
  });

});
