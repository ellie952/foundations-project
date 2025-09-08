const express = require("express");
const { logger } = require("../logger/logger.js");
const { fetchAllTickets, addNewTicket } = require("../service/ticketService.js");

const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
}

const ticketController = express.Router();

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
ticketController.post("/", (req, res) => {
    const newTicketDetails = req.body;
    const newTicket = addNewTicket(newTicketDetails);

    if (newTicket) {
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: "Ticket created successfully.", data: newTicket });
    } else {
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "Error registering new user." });
    }
})

module.exports = ticketController;