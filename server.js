const express = require("express");
const { logger } = require("./logger/logger.js");
const tickets = require("./data/ticket.json");
const userController = require("./controller/userController.js");

const server = express();

server.use(express.json());
server.use("/users", userController);

const PORT = 3000;

const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
}

// Get all tickets
server.get("/tickets", (req, res) => {
    logger.info("Tickets retrieved.");
    res.status(HttpStatusCodes.OK);
    res.json({
        message: "Tickets retrieved.",
        data: tickets
    });
})

// Submit ticket
server.post("/tickets", (req, res) => {
    const newTicket = req.body;

    if (!newTicket || !("author" in newTicket) || !("description" in newTicket) || !("type" in newTicket) || !("amount" in newTicket)) {
        logger.error("New ticket must contain an author, description, type, and amount.");
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "New ticket must contain an author, description, type, and amount." });
    } else {
        newTicket.status = "Pending";
        newTicket.id = crypto.randomUUID();
        tickets.push(newTicket);

        logger.info("New ticket added.");
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: "New ticket added." });
    }
})

server.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}.`);
});