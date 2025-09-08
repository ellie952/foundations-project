const users = require("../data/user.json");

function fetchAllUsers() {
    if (!users) throw new Error("Cannot locate users.")
    return users;
}

function validateLogin(username, password) {
    if (!username || !password) {
        throw new Error("Attempted login without username and password.");
    } else {
        for (let i = 0; i < users.length; i++) {
            if ((users[i].username === username) && (users[i].password === password)) {
                return users[i];
            }
        }
    }

    throw new Error("Invalid user credentials.");
}

function addNewUser(newUser) {
    let duplicate = false;

    if (!newUser || !("username" in newUser) || !("password" in newUser)) {
        throw new Error("New user must contain a username and password.");
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username !== newUser.username) continue;
            duplicate = true;
        }

        if (!duplicate) {
            newUser.id = crypto.randomUUID();
            newUser.role = "Employee";
            users.push(newUser);

            return newUser;
        } else {
            throw new Error("Username already taken.");
        }
    }
}

module.exports = { fetchAllUsers, validateLogin, addNewUser };