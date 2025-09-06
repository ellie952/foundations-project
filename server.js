const express = require("express");
const { logger } = require("./logger/logger.js");

const server = express();

const PORT = 3000;

server.get("/", (req, res) => {
    res.send("Hello world!");
});

server.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}.`);
});