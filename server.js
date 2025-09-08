const express = require("express");
const { logger } = require("./logger/logger.js");
const userController = require("./controller/userController.js");
const ticketController = require("./controller/ticketController.js");

const server = express();

const PORT = 3000;

server.use(express.json());
server.use("/users", userController);
server.use("/tickets", ticketController);

server.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}.`);
});