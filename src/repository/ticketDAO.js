const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-2" });
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "tickets";

async function createTicket(ticket) {
    const command = new PutCommand({
        TableName: "tickets",
        Item: ticket
    });

    try {
        await documentClient.send(command);
        return ticket;
    } catch (err) {
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
    } catch (err) {
        return null;
    }
}

async function getTicketsByStatus(status) {
    const command = new ScanCommand({
        TableName,
        FilterExpression: "#status = :status",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: { ":status": status }
    });

    try {
        const data = await documentClient.send(command);
        return data.Items;
    } catch (err) {
        return null;
    }
}

// async function getTicketsByUserId(userId) {
//     const command = new ScanCommand({
//         TableName,
//         FilterExpression: "#userId = :userId",
//         ExpressionAttributeNames: { "#userId": "userId" },
//         ExpressionAttributeValues: { ":userId": userId }
//     });

//     try {
//         const data = await documentClient.send(command);
//         return data.Items;
//     } catch (err) {
//         return null;
//     }
// }

async function updateTicket(id, status) {
    const ticketToUpdate = await getTicket(id);
    ticketToUpdate.status = status;

    const command = new PutCommand({
        TableName: "tickets",
        Item: ticketToUpdate
    });

    try {
        await documentClient.send(command);
        return ticketToUpdate;
    } catch (err) {
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
        return null;
    }
}

module.exports = { createTicket, getTicket, getTicketsByStatus, getTicketsByUserId, updateTicket, deleteTicket };