const express = require("express");
const { logger } = require("./src/utils/logger/logger.js");
const userController = require("./src/controller/userController.js");
const ticketController = require("./src/controller/ticketController.js");

const PORT = 3000;

const server = express();

server.use(express.json());
server.use("/users", userController);
server.use("/tickets", ticketController);

server.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}.`);
});