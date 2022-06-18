import { v4 as uuidv4 } from "uuid";
import { User } from "../type";

let users = [];

export const findAll = () =>
  new Promise((resolve) => {
    resolve(users);
  });

export const findById = (id) =>
  new Promise((resolve: (value: User) => void) => {
    const foundUser = users.find((user) => user.id === id);
    resolve(foundUser);
  });

export const createUser = (user) =>
  new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });

export const updateUser = (id, data) =>
  new Promise((resolve) => {
    const userIndex = users.indexOf((user) => user.id === id);
    users[userIndex] = { id, ...data };
    resolve(users[userIndex]);
  });

export const deleteUser = (id) =>
    new Promise<void>((resolve) => {
        users = users.filter(user => user.id !== id)
        resolve();
    });