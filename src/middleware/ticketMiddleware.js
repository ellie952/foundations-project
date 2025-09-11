const HTTP_STATUS_CODES = require("../util/statusCodes.js");

function validateNewTicket(req, res, next) {
    try {
        const ticket = req.body;
        if (ticket.amount && ticket.description) {
            next();
        } else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "Ticket needs an amount and description." });
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

function checkStatus(req, res, next) {
    try {
        const ticket = req.body;
        if (ticket.status === "pending") {
            next();
        } else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "Ticket has already been processed." });
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { validateNewTicket, checkStatus };