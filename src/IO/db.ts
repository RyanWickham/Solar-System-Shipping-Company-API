
const aws = require('aws-sdk');
const db = new aws.DynamoDB.DocumentClient({
    region: 'ap-southeast-2',
});


//A lit of the tables within the database so make sure to avoid error from type / easy of update
const tableNames = {
    locations: "Location-Table",
    spaceships: "Spaceship-Table",
}

const capacityOperations = {
    increase: "INCREASE",
    decrease: "DECREASE",
}

export const dynamo = {
    tableNames: tableNames,
    capacityOperations: capacityOperations,

    post: async (data: {tableName: string, item: {[key: string]: any}}): Promise<{databaseMessage: string, itemAlreadyAdded: boolean}> => {
        //formate needed for DynamoDB
        const params = {
            TableName: data.tableName,
            Item: data.item,
            ReturnValues: "ALL_OLD"//return values if an something was changed else return empty {}
        }

        try{
            const result = await db.put(params).promise();//result should equal an empty {} if this id isnt used

            //check if an item was already there => if attribute key exists, an item was overridden
            if(!result.Attributes){
                return {
                    databaseMessage: result,
                    itemAlreadyAdded: false
                };

            }else{//item already exists
                return {
                    databaseMessage: result,
                    itemAlreadyAdded: true
                };
            }

        } catch(err){
            return {
                databaseMessage: err,
                itemAlreadyAdded: true
            }
        }
    },

    get: async (data: {tableName: string, item: {[key: string]: any}}): Promise<{databaseMessage: string, item: {} }> => {
        //formate needed for DynamoDB
        const params = {
            TableName: data.tableName,
            Key: data.item.id, //only primary key
        }

        try{
            const result = await db.get(params).promise();

            return {
                databaseMessage: result,
                item: result.Item
            }

        }catch(err) {
            return {
                databaseMessage: err,
                item: null
            }
        }
        // const result = await db.get(params).promise();
        // return result.Item;
    },

    delete: async (data: {tableName: string, item: {[key: string]: any}}): Promise<{databaseMessage: string, itemWasDeleted: boolean}> => {
        try{
            const result = await db.get(data).promise();

        }catch(err) {
            return {
                databaseMessage: err,
                itemWasDeleted: false
            }
        }
    },

    put: async (data: {tableName: string, item: {[key: string]: any}}): Promise<{databaseMessage: string, transactionSuccessful: boolean}> => {
        try{
            //const result = changeItemInTable(data.tableName, data.item);

        }catch(err){
            return {
                databaseMessage: err,
                transactionSuccessful: false
            }
        }
    },
}