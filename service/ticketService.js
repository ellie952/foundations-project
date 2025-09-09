const ticketDAO = require("../repository/ticketDAO.js");
const { logger } = require("../logger/logger.js");

async function addNewTicket(newTicket) {
    if (!("author" in newTicket) || !("description" in newTicket) || !("type" in newTicket) || !("amount" in newTicket)) {
        logger.error("New ticket must contain an author, description, type, and amount.");
        return null;
    } else {
        newTicket.id = crypto.randomUUID();
        newTicket.status = "Pending";
        await ticketDAO.createTicket(newTicket);

        logger.info("New ticket added.");
        return newTicket;
    }
}

async function getTicketById(id) {
    const ticket = await ticketDAO.getTicket(id);

    if (!ticket) {
        let message = `Cannot find ticket with ID ${id}.`;
        logger.error(message);
        throw new Error(message);
    } else {
        return ticket;
    }
}

async function deleteTicketById(id) {
    try {
        await ticketDAO.deleteTicket(id);
        return id;
    } catch (error) {
        throw new Error(`Cannot find ticket with ID ${id}.`);
    }
}

module.exports = { getTicketById, addNewTicket, deleteTicketById };