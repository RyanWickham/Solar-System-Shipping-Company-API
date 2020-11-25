import { addToTable } from "./database/postRequests";
import { getFromTable } from "./database/getRequests";
import { deleteFromTable } from "./database/deleteRequest";

const aws = require('aws-sdk');
const db = new aws.DynamoDB.DocumentClient({
    region: 'ap-southeast-2',
})

//A lit of the tables within the database so make sure to avoid error from type / easy of update
const tableNames = {
    locations: "Location",
    spaceships: "Spaceship",
}

export const dynamo = {
    tableNames: tableNames,

    post: async (data: {tableName: string, item: {[key: string]: any}}) => {
        //formate needed for DynamoDB
        const params = {
            TableName: data.tableName,
            Item: data.item
        }

        // const result = await db.put(params).promise();
        // return result;

        return addToTable(params.TableName, params.Item);
    },

    get: async (data: {tableName: string, key: {[key: string]: any}}) => {
        //formate needed for DynamoDB
        const params = {
            TableName: data.tableName,
            Key: data.key
        }

        // const result = await db.get(params).promise();
        // return result.Item;

        return getFromTable(params.TableName, params.Key);
    },

    delete: async (data: {tableName: string, key: {[key: string]: any}}) => {
        return deleteFromTable(data.tableName, data.key);
    },


}