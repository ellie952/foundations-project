const bcrypt = require("bcrypt");
const userDAO = require("../repository/userDAO.js");

async function addNewUser(newUser) {
    try {
        const saltRounds = 10;
        const id = crypto.randomUUID();
        const username = newUser.username;
        const password = await bcrypt.hash(newUser.password, saltRounds);
        const role = "Employee";

        await userDAO.createUser({ id, username, password, role });
        return newUser;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getUserById(id) {
    try {
        const user = await userDAO.getUserById(id);
        return user;
    } catch (err) {
        throw new Error(err.message);
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

module.exports = { addNewUser, getUserById, getUserByUsername, updateUser, deleteUserById };