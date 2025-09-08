const { logger } = require("../logger/logger.js");
const tickets = require("../data/ticket.json");

function fetchAllTickets() {
    return tickets;
}

function addNewTicket(newTicket) {
    if (!("author" in newTicket) || !("description" in newTicket) || !("type" in newTicket) || !("amount" in newTicket)) {
        logger.error("New ticket must contain an author, description, type, and amount.");
        return null;
    } else {
        newTicket.status = "Pending";
        newTicket.id = crypto.randomUUID();
        tickets.push(newTicket);

        logger.info("New ticket added.");
        return newTicket;
    }
}

module.exports = { fetchAllTickets, addNewTicket };