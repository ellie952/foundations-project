const bcrypt = require("bcrypt");
const userDAO = require("../repository/userDAO.js");
const { logger } = require("../util/logger.js");

const saltRounds = 10;

async function addNewUser(userDetails) {
    if (!userDetails) {
        logger.error("New user details not provided to service layer.");
        return null;
    }

    const id = crypto.randomUUID();
    const username = userDetails.username;
    const password = await bcrypt.hash(
        userDetails.password,
        saltRounds
    );
    const role = "Employee";

    const newUser = { id, username, password, role };

    await userDAO.createUser(newUser);
    return newUser;
}

async function getUserById(id) {
    if (!id) {
        logger.error("User ID to retrieve not provided to service layer.");
        return null;
    }

    const user = await userDAO.getUserById(id);
    return user;
}

async function getUserByUsername(username) {
    if (!username) {
        logger.error("Username to retrieve not provided to service layer.");
        return null;
    }

    return await userDAO.getUserByUsername(username);
}

async function updateUser(updatedUserDetails) {
    if (!updatedUserDetails) {
        logger.error("Updated user details not provided to service layer.");
        return null;
    }

    const id = updatedUserDetails.id;
    const username = updatedUserDetails.username;
    const password = await bcrypt.hash(
        updatedUserDetails.password,
        saltRounds
    );
    const role = updatedUserDetails.role;

    const updatedUser = { id, username, password, role };

    await userDAO.updateUser(updatedUser);
    return updatedUser.id;
}

async function deleteUserById(id) {
    if (!id) {
        logger.error("User ID to delete not provided to service layer.");
        return null;
    }

    await userDAO.deleteUser(id);
    return id;
}

module.exports = {
    addNewUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUserById,
};
