const express = require("express");
const { logger } = require("../logger/logger.js");
const { fetchAllTickets, addNewTicket, getTicketById } = require("../service/ticketService.js");

const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
}

const ticketController = express.Router();

// TODO: use try-catch like userController.js

// Get all tickets
ticketController.get("/", (req, res) => {
    logger.info("Tickets retrieved.");
    res.status(HttpStatusCodes.OK);
    res.json({
        message: "Tickets retrieved.",
        data: fetchAllTickets()
    });
})

// Submit ticket
ticketController.post("/", async (req, res) => {
    const newTicketDetails = req.body;
    const newTicket = await addNewTicket(newTicketDetails);

    if (newTicket) {
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: "Ticket created successfully.", data: newTicket });
    } else {
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "Error registering new user." });
    }
})

ticketController.get("/:id", async (req, res) => {
    const { id } = req.params;
    let message = "";

    try {
        message = "Ticket retrieved successfully.";
        const ticket = await getTicketById(id);
        res.status(HttpStatusCodes.OK);
        res.json({ message: message, data: ticket });
        logger.info(message);
    } catch (error) {
        message = err.message;
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
})

module.exports = ticketController;