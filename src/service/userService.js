const bcrypt = require("bcrypt");
const userDAO = require("../repository/userDAO.js");

async function addNewUser(newUser) {
    if (validateUser(user)) {
        throw new Error("New user must contain a username and password.");
    } else {
        const id = crypto.randomUUID();
        const { username, password } = newUser;
        const role = "Employee";

        await userDAO.createUser({ id, username, password, role });
        return newUser;
    }
}

async function getUserById(id) {
    const user = await userDAO.getUserById(id);

    if (!user) {
        throw new Error(`Cannot find user with ID ${id}.`);
    } else {
        return user;
    }
}

async function getUserByUsername(username) {
    try {
        return await userDAO.getUserByUsername(username);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function updateUser(updatedUser) {
    try {
        await userDAO.updateUser(updatedUser);
        return updatedUser.id;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteUserById(id) {
    try {
        await userDAO.deleteUser(id);
        return id;
    } catch (err) {
        throw new Error(err.message);
    }
}

// function fetchAllUsers() {
//     if (!users) throw new Error("Cannot locate users.")
//     return users;
// }

function validateUser(user) {
    return user.username.length > 0 && user.password.length > 0;
}

async function validateLogin(username, password) {
    try {
        const user = await getUserByUsername(username);
        await bcrypt.compare(password, user.password);
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { addNewUser, getUserById, updateUser, deleteUserById, validateLogin };