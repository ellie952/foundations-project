const { logger } = require("../logger/logger.js");
const users = require("../data/user.json");

function fetchAllUsers() {
    return users;
}

function validateLogin(username, password) {
    let authorizedUser = null;

    if (!username || !password) {
        logger.error("Attempted login without username and password.");
        return authorizedUser;
    } else {
        for (let i = 0; i < users.length; i++) {
            if ((users[i].username === username) && (users[i].password === password)) {
                authorizedUser = users[i];
            }
        }
    }

    return authorizedUser;
}

function addNewUser(newUser) {
    let duplicate = false;

    if (!newUser || !("username" in newUser) || !("password" in newUser)) {
        logger.error("New user must contain a username and password.");
        return null;

    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username !== newUser.username) continue;
            duplicate = true;
        }

        if (!duplicate) {
            newUser.id = crypto.randomUUID();
            newUser.role = "Employee";
            users.push(newUser);

            logger.info("New user added.");
            return newUser;
        } else {
            logger.error("Username already taken.");
            return null;
        }
    }
}

module.exports = { fetchAllUsers, validateLogin, addNewUser };