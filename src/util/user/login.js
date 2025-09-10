const userDAO = require("../../repository/userDAO.js");
const bcrypt = require("bcrypt");

async function validateLogin(username, password) {
    try {
        const user = await userDAO.getUserByUsername(username);
        await bcrypt.compare(password, user.password);
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { validateLogin };