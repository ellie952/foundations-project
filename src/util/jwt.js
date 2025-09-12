const { logger } = require("./logger.js");
const HTTP_STATUS_CODES = require("./statusCodes.js");
const jwt = require("jsonwebtoken");

const secretKey = "secret";

async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized credentials." });
    } else {
        const user = await decodeJWT(token);
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({ message: "Bad JWT" });
        }
    }
}

async function decodeJWT(token) {
    try {
        const user = await jwt.verify(token, secretKey);
        return user;
    } catch (err) {
        logger.error(`Error in decodeJWT: ${err.message}`);
        return null;
    }
}

module.exports = {
    authenticateToken, decodeJWT
}