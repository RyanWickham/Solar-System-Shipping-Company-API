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
    put: async (data) => {
        // const params = {
        //     TableName: data.tableName,
        //     Item: data.item
        // }

        // const result = await db.put(params).promise();
        // return result;

        return "DATABASE -> ADDING THING";
    },

    get: async (data) => {
        // const params = {
        //     TableName: data.tableName,
        //     Key: data.keys
        // }

        // const result = await db.get(params).promise();
        // return result.Item;
        return "DATABASE -> GOT THING";
    },

    tableNames: tableNames,
}