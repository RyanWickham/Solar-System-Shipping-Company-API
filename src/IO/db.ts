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

    post: async (tableName: string, item: {[key: string]: any}): Promise<{
        databaseMessage: string, 
        itemAddedSuccessfuly: boolean, 
        oldItemWasEdited: boolean, 
        oldItem: {},
        errorOccured: boolean,
    }> => {

        //response results with default values -> assume failure
        let databaseMessage: string = "";
        let addedSuccessfuly: boolean = false;
        let oldItemWasEdited: boolean = true;
        let oldItem: {} = null;
        let errorOccured: boolean = true;
        
        //format data to be provided to dynamoDB
        const params = {
            TableName: tableName,
            Item: item,
            ReturnValues: "ALL_OLD"//return the item that was changed if something was changed, or {} if nothing was there before
        }

        try {
            const databaseResponse = await db.put(params).promise();

            //detect if an item was changed when added
            if(!databaseResponse.Attributes){
                //there was no old item
                databaseMessage = "The item was added successfuly.";

                addedSuccessfuly = true;
                oldItemWasEdited = false;

            }else{
                //an item was already using the primary key -> save old item to be returned
                //oldItemWasEdited == true so the end user knows this is useable
                oldItem = databaseResponse.Attributes

                databaseMessage = "There was an item already in table with provided Primary Key.";
            }

            errorOccured = false;

        }catch(err) {
            errorOccured = true;
            databaseMessage = err;
            oldItemWasEdited = false;//error occured not item should have been found
        }

        //Return object
        return {
            databaseMessage: databaseMessage,
            itemAddedSuccessfuly: addedSuccessfuly,
            oldItemWasEdited: oldItemWasEdited,
            oldItem: oldItem,
            errorOccured: errorOccured
        }
    },

    get: async (tableName: string, primaryKey: string): Promise<{databaseMessage: string, errorOccured: boolean, item: {} }> => {
        //response results with default values -> assume failure
        let databaseMessage: string = "";
        let errorOccured: boolean = true;
        let item: {} = null;

        //format data to be provided to dynamoDB
        const params = {
            TableName: tableName,
            Key: {
                id: primaryKey
            }
        }

        try {
            const databaseResponse = await db.get(params).promise();

            //check if an item was there
            if(databaseResponse.Item){
                databaseMessage = "Item was received successfuly.";
                item = databaseResponse.Item;
            }else{
                databaseMessage = "No item was found with the provided Primary Key";
            }
            
            errorOccured = false;

        } catch(err) {
            databaseMessage = err;
            errorOccured = true;
        }

        return {
            databaseMessage: databaseMessage,
            errorOccured: errorOccured,
            item: item
        }
    },

    delete: async (tableName: string, primaryKey: string): Promise<{
        databaseMessage: string, 
        errorOccured: boolean, 
        itemWasDeleted: boolean,
        deletedItem: {} 
    }> => {

        //response results with default values -> assume failure
        let databaseMessage: string = "";
        let errorOccured: boolean = true;
        let itemWasDeleted: boolean = false;
        let deletedItem: {} = null;

        //format data to be provided to dynamoDB
        const params = {
            TableName: tableName,
            Key: {
                id: primaryKey
            },
            ReturnValues: 'ALL_OLD',
        }

        try {
            const databaseResponse = await db.get(params).promise();

            if(!databaseResponse.Attributes){
                //no item was deleted
                itemWasDeleted = false;
                databaseMessage = "No item was found with the provided Primary Key.";

            }else{
                //An item was deleted
                databaseMessage = "Item was delete successfuly.";
                itemWasDeleted = true;
                deletedItem = databaseResponse.Attributes;
            }


        }catch(err) {
            databaseMessage = err;
            errorOccured = true;
            itemWasDeleted = false;
        }

        return {
            databaseMessage: databaseMessage,
            errorOccured: errorOccured,
            itemWasDeleted: itemWasDeleted,
            deletedItem: deletedItem
        }
    },

    update: async (tableName: string, primaryKey: string, valueToUpdate: string, 
        expression: '='|'+='|'-=' = '=', updatedValue: string|number): Promise<{
            databaseMessage: string,
            errorOccured: boolean,
            valuesWereUpdated: boolean,
            oldValues: {},
        }> => {
        
        //response results with default values -> assume failure
        let databaseMessage: string = "";
        let errorOccured: boolean = true;
        let valuesWereUpdated: boolean = false;
        let oldValues: {} = null;

        //format data to be provided to dynamoDB
        let params = {
            TableName: tableName,
            Key: {
                id: primaryKey
            },
            //expression will be '=' | '+=' | '-=' => default is '='
            UpdateExpression: `set ${valueToUpdate} ${expression} ${updatedValue}`,
            ReturnValues: "UPDATE_OLD"
        }

        try {
            const databaseResponse = await db.update(params).promise();

            if(databaseResponse.Attributes){
                valuesWereUpdated = true;
                oldValues = databaseResponse.Attributes;

            }else{
                valuesWereUpdated = false;
            }

            errorOccured = false;

        }catch(err) {
            databaseMessage = err;
            errorOccured = true;
        }

        return {
            databaseMessage: databaseMessage,
            errorOccured: errorOccured,
            valuesWereUpdated: valuesWereUpdated,
            oldValues: oldValues
        }
    }
}