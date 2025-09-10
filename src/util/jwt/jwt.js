const HttpStatusCodes = require("../http/statusCodes.js");
const jwt = require("jsonwebtoken");

const secretKey = "secret";

async function authenticateToken(req, res, next) {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Forbidden access." });
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
    } catch (error) {
        logger.error(err);
        return null;
    }
}

module.exports = {
    authenticateToken
}