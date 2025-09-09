const express = require("express");
const { logger } = require("../logger/logger.js");
const { fetchAllTickets, addNewTicket, getTicketById, deleteTicketById } = require("../service/ticketService.js");

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
    let message = "";

    try {
        message = "Tickets retrieved.";

        res.status(HttpStatusCodes.OK);
        res.json({
            message: message,
            data: fetchAllTickets()
        });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

// Submit ticket
ticketController.post("/", async (req, res) => {
    let message = "";

    try {
        message = "Ticket created successfully.";

        const newTicketDetails = req.body;
        const newTicket = await addNewTicket(newTicketDetails);
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: message, data: newTicket });
        logger.info(message);
    } catch (error) {
        message = "Error registering new user.";

        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

ticketController.get("/:id", async (req, res) => {
    let message = "";

    try {
        message = "Ticket retrieved successfully.";

        const { id } = req.params;
        const ticket = await getTicketById(id);
        res.status(HttpStatusCodes.OK);
        res.json({ message: message, data: ticket });
        logger.info(message);
    } catch (err) {
        message = err.message;
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
})

ticketController.delete("/:id", async (req, res) => {
    let message = "";

    try {
        message = "Ticket deleted successfully.";

        const { id } = req.params;
        await deleteTicketById(id);

        res.status(HttpStatusCodes.OK);
        res.json({ message: message });
        logger.info(message);
    } catch (error) {
        message = err.message;
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
})

module.exports = ticketController;