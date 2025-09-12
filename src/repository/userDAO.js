const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { logger } = require("../util/logger.js");
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand,
    DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-2" });
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "users";

async function createUser(user) {
    if (user) {
        const command = new PutCommand({
            TableName,
            Item: user,
        });

        try {
            await documentClient.send(command);
            return user;
        } catch (err) {
            logger.error(`Error registering new user: ${err.message}`);
            return null;
        }
    } else {
        throw new Error("New user details not provided to repository layer.");
    }
}

async function getUserById(id) {
    if (id) {
        const command = new GetCommand({
            TableName,
            Key: { id },
        });

        try {
            const data = await documentClient.send(command);
            return data.Item;
        } catch (err) {
            logger.error(`Error getting user with ID ${id}: ${err.message}`);
            return null;
        }
    } else {
        throw new Error(
            "User ID to retrieve not provided to repository layer."
        );
    }
}

async function getUserByUsername(username) {
    if (username) {
        const command = new ScanCommand({
            TableName,
            FilterExpression: "#username = :username",
            ExpressionAttributeNames: { "#username": "username" },
            ExpressionAttributeValues: { ":username": username },
        });

        try {
            const data = await documentClient.send(command);
            return data.Items[0];
        } catch (err) {
            logger.error(
                `Error getting user with username ${username}: ${err.message}`
            );
            return null;
        }
    } else {
        throw new Error(
            "Username to retrieve not provided to repository layer."
        );
    }
}

async function updateUser(updatedUser) {
    if (updateUser) {
        const command = new PutCommand({
            TableName,
            Item: updatedUser,
        });

        try {
            await documentClient.send(command);
            return updatedUser;
        } catch (err) {
            logger.error(
                `Error updating user with ID ${updatedUser.id}: ${err.message}`
            );
            return null;
        }
    } else {
        throw new Error(
            "Updated user details not provided to repository layer."
        );
    }
}

async function deleteUser(id) {
    if (id) {
        const command = new DeleteCommand({
            TableName,
            Key: { id },
        });

        try {
            await documentClient.send(command);
            return id;
        } catch (err) {
            logger.error(`Error deleting user with ID ${id}: ${err.message}`);
            return null;
        }
    } else {
        throw new Error("User ID to delete not provided to repository layer.");
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
};
