const { logger } = require("../util/logger.js");
const ticketDAO = require("../repository/ticketDAO.js");

async function addNewTicket(newTicket) {
    try {
        newTicket.id = crypto.randomUUID();
        newTicket.status = "pending";

        await ticketDAO.createTicket(newTicket);
        return newTicket;
    } catch (err) {
        logger.error(`Error adding new ticket: ${err.message}`);
        return null;
    }
}

async function getTicketById(id) {
    try {
        return await ticketDAO.getTicket(id);
    } catch (err) {
        logger.error(`Error getting ticket with ID ${id}: ${err.message}`);
        return null;
    }
}

async function getTicketsByStatus(ticketStatus) {
    try {
        return await ticketDAO.getTicketsByStatus(ticketStatus);
    } catch (err) {
        logger.error(`Error getting tickets with status ${ticketStatus}: ${err.message}`);
        return null;
    }
}

async function updateTicket(id, status) {
    if (status === "approved" || status === "denied") {
        try {
            await ticketDAO.updateTicket(id, status);
            return id;
        } catch (err) {
            logger.error(`Error updating ticket with ID ${id}: ${err.message}`);
            return null;
        }
    } else {
        throw new Error("Status can only be approved or denied.");
    }
}

async function deleteTicketById(id) {
    try {
        await ticketDAO.deleteTicket(id);
        return id;
    } catch (err) {
        logger.error(`Error deleting ticket with ID ${id}: ${err.message}`);
        return null;
    }
}

module.exports = { getTicketById, addNewTicket, getTicketsByStatus, updateTicket, deleteTicketById };