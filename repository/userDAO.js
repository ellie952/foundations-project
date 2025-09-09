const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-2" });

const documentClient = DynamoDBDocumentClient.from(client);

async function createUser(user) {
    const command = new PutCommand({
        TableName: "users",
        Item: user
    });

    try {
        await documentClient.send(command);
        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getUser(id) {
    const command = new GetCommand({
        TableName: "users",
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

async function deleteUser(id) {
    const command = new DeleteCommand({
        TableName: "users",
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

// async function updateUser(updatedUser) {
//     const command = new PutCommand({
//         TableName: "users",
//         Item: updatedUser
//     });

//     try {
//         await documentClient.send(command);
//         return updatedUser;
//     } catch (err) {
//         console.error(err);
//         return null;
//     }
// }

module.exports = { createUser, getUser, deleteUser };