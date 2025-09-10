const userDAO = require("../../repository/userDAO.js");
const HttpStatusCodes = require("../http/statusCodes.js");

async function validateNewUser(req, res, next) {
    try {
        const user = req.body;
        if (user.username && user.password) {
            const userAlreadyExisting = await userDAO.getUserByUsername(user.username);
            if (userAlreadyExisting) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "User already exists." });
            } else {
                next();
            }
        } else {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Invalid username or password." });
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { validateNewUser };