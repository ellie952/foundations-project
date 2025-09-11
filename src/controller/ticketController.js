const express = require("express");
const { logger } = require("../util/logger.js");
const ticketService = require("../service/ticketService.js");
const HTTP_STATUS_CODES = require("../util/statusCodes.js");
const { validateNewTicket, checkStatus } = require("../middleware/ticketMiddleware.js");
const { validateRole } = require("../middleware/userMiddleware.js");
const { authenticateToken } = require("../util/jwt.js");

const ticketController = express.Router();

ticketController.post("/", validateNewTicket, async (req, res) => {
    let message = "";

    try {
        message = "Ticket created successfully.";

        const newTicketDetails = req.body;
        const newTicket = await ticketService.addNewTicket(newTicketDetails);

        res.status(HTTP_STATUS_CODES.CREATED);
        res.json({ message: message, data: newTicket });
        logger.info(message);
    } catch (error) {
        message = "Error submitting new ticket.";

        res.status(HTTP_STATUS_CODES.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

ticketController.get("/:id", async (req, res) => {
    let message = "";

    try {
        message = "Ticket retrieved successfully.";

        const { id } = req.params;
        const ticket = await ticketService.getTicketById(id);

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message, data: ticket });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

ticketController.get("/status/:ticketStatus", authenticateToken, validateRole, async (req, res) => {
    let message = "";

    try {
        message = "Tickets retrieved successfully.";

        const { ticketStatus } = req.params;
        const tickets = await ticketService.getTicketsByStatus(ticketStatus.toLowerCase());

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message, data: tickets });
    } catch (err) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

ticketController.put("/update/:id", authenticateToken, validateRole, checkStatus, async (req, res) => {
    let message = "";

    try {
        message = "Ticket updated successfully."

        const { id } = req.params;
        const { status } = req.body;
        await ticketService.updateTicket(id, status);

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

ticketController.delete("/:id", async (req, res) => {
    let message = "";

    try {
        message = "Ticket deleted successfully.";

        const { id } = req.params;
        await ticketService.deleteTicketById(id);

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message });
        logger.info(message);
    } catch (error) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

// ticketController.get("/", (req, res) => {
//     let message = "";

//     try {
//         message = "Tickets retrieved.";

//         res.status(HTTP_STATUS_CODES.OK);
//         res.json({
//             message: message,
//             data: ticketService.fetchAllTickets()
//         });
//         logger.info(message);
//     } catch (err) {
//         message = err.message;

//         res.status(HTTP_STATUS_CODES.BAD_REQUEST);
//         res.json({ message: message });
//         logger.error(message);
//     }
// });

module.exports = ticketController;