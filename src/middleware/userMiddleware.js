const userDAO = require("../repository/userDAO.js");
const { decodeJWT } = require("../util/jwt.js");
const HTTP_STATUS_CODES = require("../util/statusCodes.js");

async function validateNewUser(req, res, next) {
    try {
        const user = req.body;
        if (user.username && user.password) {
            const userAlreadyExisting = await userDAO.getUserByUsername(user.username);
            if (userAlreadyExisting) {
                res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "User already exists." });
            } else {
                next();
            }
        } else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "New users need a username and a password." });
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

async function validateRole(req, res, next) {
    try {
        const user = await decodeJWT(req.headers["authorization"].split(" ")[1]);
        console.log(user);
        user.role === "Manager" ? next() : res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "Unauthorized credentials." })
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { validateNewUser, validateRole };