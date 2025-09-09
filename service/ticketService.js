const ticketDAO = require("../repository/ticketDAO.js");
const { logger } = require("../logger/logger.js");

function fetchAllTickets() {
    // return tickets;
}

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

module.exports = { fetchAllTickets, addNewTicket };