const express = require("express");
const { logger } = require("./logger/logger.js");
const users = require("./data/users.json");

const server = express();

const PORT = 3000;

const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
}

server.get("/", (req, res) => {
    res.status(HttpStatusCodes.OK);
    res.json({
        message: "Users retrieved.",
        data: users
    });
});

server.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}.`);
});