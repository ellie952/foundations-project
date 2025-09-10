const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "users";

async function createUser(user) {
    const command = new PutCommand({
        TableName,
        Item: user
    });

    try {
        await documentClient.send(command);
        return user;
    } catch (err) {
        return null;
    }
}

async function getUserById(id) {
    const command = new GetCommand({
        TableName,
        Key: { id }
    });

    try {
        const data = await documentClient.send(command);
        return data.Item;
    } catch (error) {
        return null;
    }
}

async function getUserByUsername(username) {
    const command = new ScanCommand({
        TableName,
        FilterExpression: "#username = :username",
        ExpressionAttributeNames: { "#username": "username" },
        ExpressionAttributeValues: { ":username": username }
    });

    try {
        const data = await documentClient.send(command);
        return data.Items[0];
    } catch (err) {
        return null;
    }
}

async function updateUser(updatedUser) {
    const command = new PutCommand({
        TableName,
        Item: updatedUser
    });

    try {
        await documentClient.send(command);
        return updatedUser;
    } catch (err) {
        return null;
    }
}

async function deleteUser(id) {
    const command = new DeleteCommand({
        TableName,
        Key: { id }
    });

    try {
        await documentClient.send(command);
        return id;
    } catch (err) {
        return null;
    }
}

module.exports = { createUser, getUserById, getUserByUsername, updateUser, deleteUser };