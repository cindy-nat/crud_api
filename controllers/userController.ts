import { validate } from "uuid";
import { getPostData, RESPONSES_CODES, writeHead } from "../helpers/index.js";
import * as User from "../modules/users.js";
import { createUser } from "../modules/users.js";
import type { User as UserType } from "../type";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    writeHead(res, RESPONSES_CODES.GET_SUCCESS);
    res.end(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (req, res, id) => {
  try {
    if (!validate(id)) {
      writeHead(res, RESPONSES_CODES.DATA_NOT_VALID);
      res.end(JSON.stringify({ message: `${id} is not a valid id` }));
    } else {
      const user = await User.findById(id);
      if (!user) {
        writeHead(res, RESPONSES_CODES.DATA_NOT_FOUND);
        res.end(JSON.stringify({ message: `${id} is not found` }));
      }
      writeHead(res, RESPONSES_CODES.GET_SUCCESS);
      res.end(JSON.stringify(user));
    }
  } catch (e) {
    console.log(e);
  }
};

export const addUser = async (req, res) => {
  try {
    const body = await getPostData(req);
    const {
      username,
      age,
      hobbies,
    }: { username: string; age: number; hobbies: string | undefined[] } =
      typeof body === "string" && JSON.parse(body);

    if (username && age && hobbies) {
      const user = {
        username,
        age,
        hobbies,
      };
      const newUser = await createUser(user);

      if (newUser) {
        writeHead(res, RESPONSES_CODES.DATA_CREATED);
        res.end(JSON.stringify(newUser));
      } else {
        writeHead(res, RESPONSES_CODES.DATA_NOT_VALID);
        res.end(
          JSON.stringify({
            message: "User was not added due to invalid data",
          })
        );
      }
    } else {
      writeHead(res, RESPONSES_CODES.DATA_NOT_VALID);
      res.end(
        JSON.stringify({ message: "User was not added due to invalid data" })
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (req, res, id) => {
  try {
    if (!validate(id)) {
      writeHead(res, RESPONSES_CODES.DATA_NOT_VALID);
      res.end(JSON.stringify({ message: `${id} is not a valid id` }));
    } else {
      const user = await User.findById(id);

      if (!user) {
        writeHead(res, RESPONSES_CODES.DATA_NOT_FOUND);
        res.end(JSON.stringify({ message: `There is no user with id: ${id}` }));
      } else {
        const body = await getPostData(req);
        const { username, age, hobbies }: UserType = JSON.parse(<string>body);

        const updatedUserData = {
          username: username || user.username,
          age: age || user.age,
          hobbies: hobbies || user.hobbies,
        };

        const updatedUser = await User.updateUser(id, updatedUserData);

        if (!updatedUser) {
          writeHead(res, RESPONSES_CODES.DATA_NOT_VALID);
          res.end(
            JSON.stringify({
              message: "Something went wrong with updating data",
            })
          );
        } else {
          writeHead(res, RESPONSES_CODES.GET_SUCCESS);
          res.end(JSON.stringify(updatedUser));
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (req, res, id) => {
  try {
    if (!validate(id)) {
      writeHead(res, RESPONSES_CODES.DATA_NOT_VALID);
      res.end(JSON.stringify({ message: `${id} is not a valid id` }));
    } else {
      const user = await User.findById(id);

      if (!user) {
        writeHead(res, RESPONSES_CODES.DATA_NOT_FOUND);
        res.end(JSON.stringify({ message: `There is no user with id: ${id}` }));
      } else {
        await User.deleteUser(id);
        writeHead(res, RESPONSES_CODES.DATA_DELETED);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
