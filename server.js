const express = require("express");

const server = express();

const PORT = 3000;

server.get("/", (req, res) => {
    res.send("Hello world!");
});

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});