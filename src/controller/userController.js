const express = require("express");
const jwt = require("jsonwebtoken");
const { logger } = require("../util/logger.js");
const { validateLogin } = require("../util/login.js");
const { validateNewUser } = require("../middleware/userMiddleware.js");
const userService = require("../service/userService.js");
const HTTP_STATUS_CODES = require("../util/statusCodes.js");

const secretKey = "secret";

const userController = express.Router();

userController.post("/register", validateNewUser, async (req, res) => {
    let message = "";

    try {
        message = "User registered successfully.";

        const newUser = req.body;
        await userService.addNewUser(newUser);

        res.status(HTTP_STATUS_CODES.CREATED);
        res.json({ message: message });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.json({ message: message });
        logger.error(`Error registering new user: ${message}`);
    }
});

userController.post("/login", async (req, res) => {
    let message = "";

    try {
        message = "User logged in successfully.";
        const { username, password } = req.body;

        const user = await validateLogin(username, password);
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                password: user.password,
                role: user.role,
            },
            secretKey,
            {
                expiresIn: "15m",
            }
        );

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message, token });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.json({ message: message });
        logger.error(`Error logging in: ${message}`);
    }
});

userController.get("/:id", async (req, res) => {
    let message = "";

    const { id } = req.params;

    try {
        message = "User retrieved successfully.";

        const user = await userService.getUserById(id);

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message, data: user });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.json({ message: message });
        logger.error(`Error fetching user with ID ${id}: ${message}`);
    }
});

userController.put("/update", async (req, res) => {
    let message = "";

    const updatedUser = req.body;

    try {
        message = "User updated successfully.";

        await userService.updateUser(updatedUser);

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.json({ message: message });
        logger.error(`Error updating user ${updatedUser.username}: ${message}`);
    }
});

userController.delete("/:id", async (req, res) => {
    let message = "";

    const { id } = req.params;

    try {
        message = "User deleted successfully.";

        await userService.deleteUserById(id);

        res.status(HTTP_STATUS_CODES.OK);
        res.json({ message: message });
        logger.info(message);
    } catch (error) {
        message = err.message;

        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        res.json({ message: message });
        logger.error(`Error deleting user with ID ${id}: ${message}`);
    }
});

module.exports = userController;
