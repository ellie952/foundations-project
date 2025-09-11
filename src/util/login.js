const userService = require("../service/userService.js");
const bcrypt = require("bcrypt");

async function validateLogin(username, password) {
    try {
        const user = await userService.getUserByUsername(username);
        console.log(user)
        if (await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            throw new Error("Invalid login credentials.");
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { validateLogin };