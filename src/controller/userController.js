const express = require("express");
const jwt = require("jsonwebtoken");
const { logger } = require("../util/logger/logger.js");
const { validateLogin } = require("../util/user/login.js");
const { validateNewUser } = require("../util/user/register.js");
const userService = require("../service/userService.js");

const secretKey = "secret";

const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
}

const userController = express.Router();

userController.post("/register", validateNewUser, async (req, res) => {
    let message = "";

    try {
        message = "User registered successfully."

        const newUser = req.body;
        await userService.addNewUser(newUser);

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

userController.post("/login", async (req, res) => {
    let message = "";

    try {
        message = "User logged in successfully.";
        const { username, password } = req.body;

        const data = await validateLogin(username, password);
        const token = jwt.sign(
            {
                id: data.id,
                username
            },
            secretKey,
            {
                expiresIn: "15m"
            }
        );

        res.status(HttpStatusCodes.CREATED);
        res.json({ message: message, token });
        logger.info(message);
    } catch (err) {
        message = err.message;
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

userController.get("/:id", async (req, res) => {
    let message = "";

    try {
        message = "User retrieved successfully."

        const { id } = req.params;
        const user = await userService.getUserById(id);

        res.status(HttpStatusCodes.OK);
        res.json({ message: message, data: user });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

userController.put("/update", async (req, res) => {
    let message = "";

    try {
        message = "User updated successfully."

        const updatedUser = req.body;
        await userService.updateUser(updatedUser);

        res.status(HttpStatusCodes.OK);
        res.json({ message: message });
        logger.info(message);
    } catch (err) {
        message = err.message;

        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

userController.delete("/:id", async (req, res) => {
    let message = "";

    try {
        message = "User deleted successfully.";

        const { id } = req.params;
        await userService.deleteUserById(id);

        res.status(HttpStatusCodes.OK);
        res.json({ message: message });
        logger.info(message);
    } catch (error) {
        message = err.message;

        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: message });
        logger.error(message);
    }
});

// userController.get("/", (req, res) => {
//     let message = "";

//     try {
//         message = "Users retrieved."
//         res.status(HttpStatusCodes.OK);
//         res.json({
//             message: message,
//             data: fetchAllUsers()
//         });
//         logger.info(message);
//     } catch (err) {
//         message = err.message;
//         res.status(HttpStatusCodes.BAD_REQUEST);
//         res.json({ message: message });
//         logger.error(err.message);
//     }
// });

module.exports = userController;