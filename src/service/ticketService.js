const ticketDAO = require("../repository/ticketDAO.js");

async function addNewTicket(newTicket) {
    try {
        newTicket.id = crypto.randomUUID();
        newTicket.status = "Pending";

        await ticketDAO.createTicket(newTicket);
        return newTicket;
    } catch (err) {
        throw new Error(err.message);
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

async function updateTicket(updatedTicket) {
    try {
        await ticketDAO.updateTicket(updatedTicket);
        return updatedTicket.id;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteTicketById(id) {
    try {
        await ticketDAO.deleteTicket(id);
        return id;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getTicketById, addNewTicket, updateTicket, deleteTicketById };