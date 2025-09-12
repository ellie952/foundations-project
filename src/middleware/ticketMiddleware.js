const { logger } = require("../util/logger.js");
const HTTP_STATUS_CODES = require("../util/statusCodes.js");

function validateNewTicket(req, res, next) {
    try {
        const ticket = req.body;
        if (ticket.amount && ticket.description) {
            next();
        } else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: "Ticket needs an amount and description.",
            });
        }
    } catch (err) {
        logger.error(`Error in validateNewTicket middleware: ${err.message}.`);
    }
}

function checkStatus(req, res, next) {
    try {
        const ticket = req.body;
        if (ticket.status === "approved" || ticket.status === "denied") {
            next();
        } else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: "Ticket status can only be approved or denied.",
            });
        }
    } catch (err) {
        logger.error(`Error in checkStatus middleware: ${err.message}`);
    }
}

module.exports = { validateNewTicket, checkStatus };
