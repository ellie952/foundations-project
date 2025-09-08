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
    let message = "";

    try {
        message = "Users retrieved."
        res.status(HttpStatusCodes.OK);
        res.json({
            message: message,
            data: fetchAllUsers()
        });
        logger.info(message);
    } catch (err) {
        message = err.message;
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(err.message);
    }
});

// Register
userController.post("/register", (req, res) => {
    let message = "";

    try {
        message = "User registered successfully."
        const newUser = req.body;
        addNewUser(newUser);
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: message });
        logger.info(message);
    } catch (err) {
        message = err.message;
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

// Login
userController.post("/login", (req, res) => {
    let message = "";

    try {
        message = "User logged in successfully.";
        const { username, password } = req.body;
        validateLogin(username, password);
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: message });
        logger.info(message);
    } catch (err) {
        message = err.message;
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

module.exports = userController;