const express = require("express");

const logger = require("morgan");

const projectRouter = require("./project/projectRouter");

const server = express();

server.use(express.json());
server.use(logger("combined"));
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Express!</h1>");
});

module.exports = server;
