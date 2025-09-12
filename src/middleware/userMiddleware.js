const userDAO = require("../repository/userDAO.js");
const { decodeJWT } = require("../util/jwt.js");
const HTTP_STATUS_CODES = require("../util/statusCodes.js");
const { logger } = require("../util/logger.js");

async function validateNewUser(req, res, next) {
    try {
        const user = req.body;
        if (user.username && user.password) {
            const userAlreadyExisting = await userDAO.getUserByUsername(
                user.username
            );
            if (userAlreadyExisting) {
                res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                    message: "User already exists.",
                });
            } else {
                next();
            }
        } else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: "New users need a username and a password.",
            });
        }
    } catch (err) {
        logger.error(`Error validating new user: ${err.message}`)
    }
}

async function validateManager(req, res, next) {
    try {
        const user = await decodeJWT(
            req.headers["authorization"].split(" ")[1]
        );
        user.role === "Manager"
            ? next()
            : res
                .status(HTTP_STATUS_CODES.UNAUTHORIZED)
                .json({ message: "Unauthorized credentials." });
    } catch (err) {
        logger.error(`Error validating manager role: ${err.message}`)
    }
}

async function validateEmployee(req, res, next) {
    try {
        const user = await decodeJWT(
            req.headers["authorization"].split(" ")[1]
        );
        user.role === "Employee" ? next() : res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized credentials" });
    } catch (err) {
        logger.error(`Error validating employee role: ${err.message}`)
    }
}

module.exports = { validateNewUser, validateManager, validateEmployee };
