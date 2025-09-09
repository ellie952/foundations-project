const userDAO = require("../repository/userDAO.js");

async function addNewUser(newUser) {
    if (!newUser || !("username" in newUser) || !("password" in newUser)) {
        throw new Error("New user must contain a username and password.");
    } else {
        const id = crypto.randomUUID();
        const { username, password } = newUser;
        await userDAO.createUser({ id, username, password });
        return newUser;
    }
}

async function getUserById(id) {
    const user = await userDAO.getUser(id);

    if (!user) {
        throw new Error(`Cannot find user with ID ${id}.`);
    } else {
        return user;
    }
}

// async function updateUser(updatedUser) {
//     try {
//         await userDAO.updateUser(updatedUser);
//         return updatedUser.id;
//     } catch (err) {
//         throw new Error(err.message);
//     }
// }

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

// function validateLogin(username, password) {
//     if (!username || !password) {
//         throw new Error("Attempted login without username and password.");
//     } else {
//         for (let i = 0; i < users.length; i++) {
//             if ((users[i].username === username) && (users[i].password === password)) {
//                 return users[i];
//             }
//         }
//     }

//     throw new Error("Invalid user credentials.");
// }

module.exports = { addNewUser, getUserById, deleteUserById };