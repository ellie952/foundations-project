const HttpStatusCodes = require("../http/statusCodes.js");

function validateNewTicket(req, res, next) {
    try {
        const ticket = req.body;
        if (ticket.amount && ticket.description) {
            next();
        } else {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Ticket needs an amount and description." });
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { validateNewTicket };