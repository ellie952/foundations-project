const express = require("express");
const { logger } = require("../logger/logger.js");
const { fetchAllUsers, addNewUser, validateLogin } = require("../service/userService.js");

const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
}

const userController = express.Router();

// Get all users
userController.get("/", (req, res) => {
    logger.info("Users retrieved.");
    res.status(HttpStatusCodes.OK);
    res.json({
        message: "Users retrieved.",
        data: fetchAllUsers()
    });
});

// Register
userController.post("/register", (req, res) => {
    const newUser = req.body;
    const registeredUser = addNewUser(newUser);

    if (registeredUser) {
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: "User registered successfully." });
    } else {
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "Error registering new user." });
    }
});

// Login
userController.post("/login", (req, res) => {
    const { username, password } = req.body;
    const loggedInUser = validateLogin(username, password);

    if (loggedInUser) {
        res.status(HttpStatusCodes.OK);
        res.json({ message: "User successfully logged in.", data: loggedInUser });
    } else {
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "Error registering new user." });
    }
});

module.exports = userController;