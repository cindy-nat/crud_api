import { v4 as uuidv4 } from 'uuid';
import type {UserData, UserType} from '../type';

let users: UserType[] = [];

export const findAll = () => new Promise((resolve) => {
  resolve(users);
});

export const findById = (id: string) => new Promise((resolve: (value: UserData | undefined) => void) => {
  const foundUser = users.find((user) => user.id === id);
  resolve(foundUser);
});

export const createUser = (user: UserData) => new Promise((resolve) => {
  const newUser = { id: uuidv4(), ...user };
  users.push(newUser);
  resolve(newUser);
});

export const updateUser = (id: string, data: UserData) => new Promise((resolve) => {
  // @ts-ignore
  const userIndex:number = users.indexOf((user: UserType) => user.id === id);
  users[userIndex] = { id, ...data };
  resolve(users[userIndex]);
});

export const deleteUser = (id: string) => new Promise<void>((resolve) => {
  users = users.filter((user) => user.id !== id);
  resolve();
});
