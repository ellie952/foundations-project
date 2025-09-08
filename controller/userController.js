const express = require("express");
const { logger } = require("../logger/logger.js")
const users = require("../data/user.json");

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
        data: users
    });
});

// Register
userController.post("/register", (req, res) => {
    const newUser = req.body;
    let duplicate = false;

    if (!newUser || !("username" in newUser) || !("password" in newUser)) {
        logger.error("New user must contain a username and password.");
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "New user must contain a username and password." });
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username !== newUser.username) continue;
            duplicate = true;
        }

        if (!duplicate) {
            newUser.id = crypto.randomUUID();
            newUser.role = "Employee";
            users.push(newUser);

            logger.info("New user added.");
            res.status(HttpStatusCodes.CREATED);
            res.json({ message: "New user added." });
        } else {
            logger.error("Username already taken.");
            res.status(HttpStatusCodes.BAD_REQUEST);
            res.json({ message: "Username already taken." });
        }
    }
});

// Login
userController.post("/login", (req, res) => {
    const credentials = req.body;
    let authorizedUser = null;

    if (!credentials || !("username" in credentials) || !("password" in credentials)) {
        logger.error("Attempted login without username and password.");
        return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: "To log in, you must enter a username and password." });
    } else {
        for (let i = 0; i < users.length; i++) {
            if ((users[i].username === credentials.username) && (users[i].password === credentials.password)) {
                authorizedUser = users[i];
            }
        }
    }

    if (!authorizedUser) {
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "Invalid credentials." });
    } else {
        res.status(HttpStatusCodes.OK);
        res.json({ message: "User authorized.", data: authorizedUser });
    }
});

module.exports = userController;