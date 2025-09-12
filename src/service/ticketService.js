const { logger } = require("../util/logger.js");
const ticketDAO = require("../repository/ticketDAO.js");

async function addNewTicket(newTicket) {
    if (newTicket) {
        try {
            newTicket.id = crypto.randomUUID();
            newTicket.status = "pending";

            await ticketDAO.createTicket(newTicket);
            return newTicket;
        } catch (err) {
            logger.error(`Error adding new ticket: ${err.message}`);
            return null;
        }
    } else {
        throw new Error("New ticket details not provided to service layer.");
    }
}

async function getTicketById(id) {
    if (id) {
        try {
            return await ticketDAO.getTicket(id);
        } catch (err) {
            logger.error(`Error getting ticket with ID ${id}: ${err.message}`);
            return null;
        }
    } else {
        throw new Error("Ticket ID to retrieve not provided to service layer.");
    }
}

async function getTicketsByStatus(ticketStatus) {
    if (ticketStatus) {
        try {
            return await ticketDAO.getTicketsByStatus(ticketStatus);
        } catch (err) {
            logger.error(
                `Error getting tickets with status ${ticketStatus}: ${err.message}`
            );
            return null;
        }
    } else {
        throw new Error(
            "Ticket status to retrieve not provided to service layer."
        );
    }
}

async function getTicketsByUserId(userId) {
    if (userId) {
        try {
            return await ticketDAO.getTicketsByUserId(userId);
        } catch (err) {
            logger.error(
                `Error getting tickets from user with ID ${userId}: ${err.message}`
            );
            return null;
        }
    } else {
        throw new Error("User ID to retrieve tickets not provided to service layer.");
    }
}

async function updateTicket(id, status) {
    if (id) {
        if (status === "approved" || status === "denied") {
            try {
                await ticketDAO.updateTicket(id, status);
                return id;
            } catch (err) {
                logger.error(
                    `Error updating ticket with ID ${id}: ${err.message}`
                );
                return null;
            }
        } else {
            throw new Error("Status can only be approved or denied.");
        }
    } else {
        throw new Error("Updated ticket ID not provided to service layer.");
    }
}

async function deleteTicketById(id) {
    if (id) {
        try {
            await ticketDAO.deleteTicket(id);
            return id;
        } catch (err) {
            logger.error(`Error deleting ticket with ID ${id}: ${err.message}`);
            return null;
        }
    } else {
        throw new Error("Ticket ID to delete not provided to service layer.");
    }
}

module.exports = {
    getTicketById,
    addNewTicket,
    getTicketsByStatus,
    getTicketsByUserId,
    updateTicket,
    deleteTicketById,
};
