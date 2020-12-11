import IO from ".";

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
            Key: data.item, //only primary key
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
        
        let params = {
            TableName: data.tableName,
            Key: {id: data.item.id},
            UpdateExpression: ``,
            ExpressionAttributeValues: {}
        }

        //two seperate update functions, 1 for location capacity, 1 for spaceship status
        if(params.TableName == IO.database.tableNames.locations){
            params.UpdateExpression = `set currentAmountOfCapacityUsed = currentAmountOfCapacityUsed + :amount`;
            //location will either be +1 or -1 to capacity
            if(data.item.operation == IO.database.capacityOperations.increase){
                params.ExpressionAttributeValues = {
                    ':amount': 1
                }
            }else{
                params.ExpressionAttributeValues = {
                    ':amount': -1
                }
            }
            

        }else if (params.TableName == IO.database.tableNames.spaceships){
            //spaceship will update the status or locationID
            if(data.item.type == IO.spaceshipValueUpdateValues.status){
                params.UpdateExpression = `set status = :newStatus`;
                params.ExpressionAttributeValues = {
                    ':newStatus': data.item.value
                }

            }else if(data.item.type == IO.spaceshipValueUpdateValues.locationID){
                params.UpdateExpression = `set locationID = :newLocationID`;
                params.ExpressionAttributeValues = {
                    ':newLocationID': data.item.value
                }
            }
            
        }

        try{
            const result = await db.update(params).promise();

            return {
                databaseMessage: result,
                transactionSuccessful: true
            }

        }catch(err){
            return {
                databaseMessage: err,
                transactionSuccessful: false
            }
        }
    },
}