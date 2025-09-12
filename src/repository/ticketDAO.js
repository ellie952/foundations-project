const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand,
    DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-2" });
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "tickets";

async function createTicket(ticket) {
    if (ticket) {
        const command = new PutCommand({
            TableName,
            Item: ticket,
        });

        try {
            await documentClient.send(command);
            return ticket;
        } catch (err) {
            return null;
        }
    } else {
        throw new Error("New ticket details not provided to repository layer.");
    }
}

async function getTicket(id) {
    if (id) {
        const command = new GetCommand({
            TableName,
            Key: { id },
        });

        try {
            const data = await documentClient.send(command);
            return data.Item;
        } catch (err) {
            return null;
        }
    } else {
        throw new Error(
            "Ticket ID to retrieve not provided to repository layer."
        );
    }
}

async function getTicketsByStatus(status) {
    if (status) {
        const command = new ScanCommand({
            TableName,
            FilterExpression: "#status = :status",
            ExpressionAttributeNames: { "#status": "status" },
            ExpressionAttributeValues: { ":status": status },
        });

        try {
            const data = await documentClient.send(command);
            return data.Items;
        } catch (err) {
            return null;
        }
    } else {
        throw new Error(
            "Ticket status to retrieve not provided to repository layer."
        );
    }
}

async function getTicketsByUserId(userId) {
    if (userId) {
        const command = new ScanCommand({
            TableName,
            FilterExpression: "#userId = :userId",
            ExpressionAttributeNames: { "#userId": "userId" },
            ExpressionAttributeValues: { ":userId": userId }
        });

        try {
            const data = await documentClient.send(command);
            return data.Items;
        } catch (err) {
            return null;
        }
    } else {
        throw new Error("Ticket ID to update and/or updated ticket status not provided to repository layer.");
    }
}

async function updateTicket(id, status) {
    if (!id || !status) {
        throw new Error(
            "Ticket ID to update and/or updated ticket status not provided to repository layer."
        );
    } else {
        const ticketToUpdate = await getTicket(id);
        ticketToUpdate.status = status;

        const command = new PutCommand({
            TableName,
            Item: ticketToUpdate,
        });

        try {
            await documentClient.send(command);
            return ticketToUpdate;
        } catch (err) {
            return null;
        }
    }
}

async function deleteTicket(id) {
    if (id) {
        const command = new DeleteCommand({
            TableName,
            Key: { id },
        });

        try {
            await documentClient.send(command);
            return id;
        } catch (err) {
            return null;
        }
    } else {
        throw new Error(
            "Ticket ID to delete not provided to repository layer."
        );
    }
}

module.exports = {
    createTicket,
    getTicket,
    getTicketsByStatus,
    getTicketsByUserId,
    updateTicket,
    deleteTicket,
};
