const express = require("express");
const { logger } = require("./logger/logger.js");
const users = require("./data/user.json");
const tickets = require("./data/ticket.json");

const server = express();

server.use(express.json());

const PORT = 3000;

const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
}

// Get all users
server.get("/users", (req, res) => {
    logger.info("Users retrieved.");
    res.status(HttpStatusCodes.OK);
    res.json({
        message: "Users retrieved.",
        data: users
    });
});

// Register
server.post("/users/register", (req, res) => {
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
server.post("/users/login", (req, res) => {
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
        res.json({ message: "User authorized", data: authorizedUser });
    }
});

// Get all tickets
server.get("/tickets", (req, res) => {
    logger.info("Tickets retrieved.");
    res.status(HttpStatusCodes.OK);
    res.json({
        message: "Tickets retrieved.",
        data: tickets
    });
})

// Submit ticket
server.post("/tickets", (req, res) => {
    const newTicket = req.body;

    if (!newTicket || !("author" in newTicket) || !("description" in newTicket) || !("type" in newTicket) || !("amount" in newTicket)) {
        logger.error("New ticket must contain an author, description, type, and amount.");
        res.status(HttpStatusCodes.BAD_REQUEST);
        res.json({ message: "New ticket must contain an author, description, type, and amount." });
    } else {
        newTicket.status = "Pending";
        newTicket.id = crypto.randomUUID();
        tickets.push(newTicket);

        logger.info("New ticket added.");
        res.status(HttpStatusCodes.CREATED);
        res.json({ message: "New ticket added." });
    }
})

server.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}.`);
});