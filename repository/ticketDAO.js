const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-2" });

const documentClient = DynamoDBDocumentClient.from(client);

async function createTicket(ticket) {
    const command = new PutCommand({
        TableName: "tickets",
        Item: ticket
    });

    try {
        await documentClient.send(command);
        return ticket;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getTicket(id) {
    const command = new GetCommand({
        TableName: "tickets",
        Key: { id }
    });

    try {
        const data = await documentClient.send(command);
        return data.Item;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function updateTicket(updatedTicket) {
    const command = new PutCommand({
        TableName: "tickets",
        Item: updatedTicket
    });

    try {
        await documentClient.send(command);
        return updatedTicket;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function deleteTicket(id) {
    const command = new DeleteCommand({
        TableName: "tickets",
        Key: { id }
    });

    try {
        await documentClient.send(command);
        return id;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = { createTicket, getTicket, updateTicket, deleteTicket };