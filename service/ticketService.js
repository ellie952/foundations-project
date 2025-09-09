const ticketDAO = require("../repository/ticketDAO.js");

async function addNewTicket(newTicket) {
    if (!("author" in newTicket) || !("description" in newTicket) || !("type" in newTicket) || !("amount" in newTicket)) {
        throw new Error("New ticket must contain an author, description, type, and amount.");
    } else {
        newTicket.id = crypto.randomUUID();
        newTicket.status = "Pending";

        await ticketDAO.createTicket(newTicket);
        return newTicket;
    }
}

async function getTicketById(id) {
    const ticket = await ticketDAO.getTicket(id);

    if (!ticket) {
        throw new Error(`Cannot find ticket with ID ${id}.`);
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