const { logger } = require("../util/logger.js");
const ticketDAO = require("../repository/ticketDAO.js");

async function addNewTicket(newTicket) {
    if (!newTicket) {
        logger.error("New ticket details not provided to service layer.");
        return null;
    }

    newTicket.id = crypto.randomUUID();
    newTicket.status = "pending";

    await ticketDAO.createTicket(newTicket);
    return newTicket;
}

async function getTicketById(id) {
    if (!id) {
        logger.error("Ticket ID to retrieve not provided to service layer.");
        return null;
    }

    return await ticketDAO.getTicket(id);
}

async function getTicketsByStatus(ticketStatus) {
    if (!ticketStatus) {
        logger.error("Ticket status to retrieve not provided to service layer.");
        return null;
    }

    return await ticketDAO.getTicketsByStatus(ticketStatus);
}

async function getTicketsByUserId(userId) {
    if (!userId) {
        logger.error("User ID to retrieve not provided to service layer.");
        return null;
    }

    return await ticketDAO.getTicketsByUserId(userId);
}

async function updateTicket(id, status) {
    if (!id || !status) {
        logger.error("Ticket ID to update and/or updated status not provided to service layer.");
        return null;
    }

    const ticket = await getTicketById(id);

    if (ticket.status === "pending") {
        await ticketDAO.updateTicket(id, status);
        return id;
    } else {
        throw new Error("Ticket has already been processed.");
    }
}

async function deleteTicketById(id) {
    if (!id) {
        logger.error("Ticket ID to delete not provided to service layer.");
    }

    await ticketDAO.deleteTicket(id);
    return id;
}

module.exports = {
    getTicketById,
    addNewTicket,
    getTicketsByStatus,
    getTicketsByUserId,
    updateTicket,
    deleteTicketById,
};
