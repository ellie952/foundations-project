const bcrypt = require("bcrypt");
const userDAO = require("../repository/userDAO.js");
const { logger } = require("../util/logger.js");

const saltRounds = 10;

async function addNewUser(userDetails) {
    try {
        const id = crypto.randomUUID();
        const username = userDetails.username;
        const password = await bcrypt.hash(userDetails.password, saltRounds);
        const role = "Employee";

        const newUser = { id, username, password, role };

        await userDAO.createUser(newUser);
        return newUser;
    } catch (err) {
        logger.error(`Error adding new user: ${err.message}`);
        return null;
    }
}

async function getUserById(id) {
    try {
        const user = await userDAO.getUserById(id);
        return user;
    } catch (err) {
        logger.error(`Error getting user by ID ${id}: ${err.message}`);
        return null;
    }
}

async function getUserByUsername(username) {
    try {
        return await userDAO.getUserByUsername(username);
    } catch (err) {
        logger.error(`Error getting user ${username}: ${err.message}`);
        return null;
    }
}

async function updateUser(updatedUserDetails) {
    try {
        const id = updatedUserDetails.id;
        const username = updatedUserDetails.username;
        const password = await bcrypt.hash(updatedUserDetails.password, saltRounds);
        const role = updatedUserDetails.role;

        const updatedUser = { id, username, password, role };

        await userDAO.updateUser(updatedUser);
        return updatedUser.id;
    } catch (err) {
        logger.error(`Error updating user ${updatedUserDetails.username}: ${err.message}`);
        return null;
    }
}

async function deleteUserById(id) {
    try {
        await userDAO.deleteUser(id);
        return id;
    } catch (err) {
        logger.error(`Error deleting user with ID ${id}: ${err.message}`);
        return null;
    }
}

// function fetchAllUsers() {
//     if (!users) throw new Error("Cannot locate users.")
//     return users;
// }

module.exports = { addNewUser, getUserById, getUserByUsername, updateUser, deleteUserById };