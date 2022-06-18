import { createServer } from "http";
import {addUser, getUser, getUsers, updateUser, deleteUser} from "./controllers/userController.js";
import {RESPONSES_CODES, writeHead} from "./helpers/index.js";

const server = createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  }
  else if (req.url.startsWith("/api/users/") && req.method === "GET") {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  }
  else if (req.url === "/api/users" && req.method === "POST") {
    addUser(req, res);
  }
  else if (req.url.startsWith("/api/users/") && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  }
  else if (req.url.startsWith("/api/users/") && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  }
  else {
    writeHead(res, RESPONSES_CODES.DATA_NOT_FOUND);
    res.end(JSON.stringify({ message: `Path not found` }));
  }
  req.on('error', error => {
    writeHead(res, RESPONSES_CODES.SERVER_ERROR);
    res.end(JSON.stringify({ message: `Server is unavailable due to ${error}` }));
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(`The server is launched on Port ${PORT}`)
);
