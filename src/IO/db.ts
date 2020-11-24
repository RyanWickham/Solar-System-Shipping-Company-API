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
    put: async (data: {tableName: string, item: {[key: string]: any}}) => {
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

    tableNames: tableNames,
}

const addToTable = (tableName: string, item: {[key: string]: any}): {databaseMessage: string} => {
    switch(tableName){
        case tableNames.locations:
            return addItemToLocationTable(item);
        case tableNames.spaceships:
            return addItemToSpaceshipTable(item);
        default:
            return {
                databaseMessage: "Error: table was not found, item was not added."
            }
    }
}

const addItemToLocationTable = (item: {[key: string]: any}): {databaseMessage: string} => {
    //check if item already exists
    for(let i=0; i<locationTable.length; i++){
        if(locationTable[i].id === item.id){
            //item exists
            return {
                databaseMessage: "Item already exists, did not add item.",
            }
        }
    }

    //item does not exists -> add it
    //convert item to a Location object
    const itemToAdd: Location = {
        id: item.id,
        cityName: item.cityName,
        planetName: item.planetName,
        totalAvailableCapacity: item.totalAvailableCapacity,
        currentAmountOfCapacityUsed: item.currentAmountOfCapacityUsed
    }

    locationTable.push(itemToAdd);

    return {
        databaseMessage: "Item was added successfuly."
    }
}

const addItemToSpaceshipTable = (item: {[key: string]: string}): {databaseMessage: string} => {
    //check if item already exists
    for(let i=0; i<spaceshipTable.length; i++){
        if(spaceshipTable[i].id === item.id){
            //item exists
            return {
                databaseMessage: "Item already exists, did not add item.",
            }
        }
    }

    //item does not exists -> add it
    //convert item to a Location object
    const itemToAdd: Spaceship = {
        id: item.id,
        name: item.name,
        model: item.model,
        locationID: item.locationID,
        status: item.status
    }

    spaceshipTable.push(itemToAdd);
    return {
        databaseMessage: "Item was added successfuly."
    }
}

const getFromTable = (tableName: string, key: {[key: string]: any}): {databaseMessage: string} => {
    switch(tableName){
        case tableNames.locations:
            return getItemFromLocationTable(key);
        case tableNames.spaceships:
            return getItemFromSpaceshipTable(key);
        default:
            return {
                databaseMessage: "Error: table was not found, item was not added."
            }
    }
}

const getItemFromLocationTable = (item: {[key: string]: any}): {databaseMessage: string, item: Location} => {
    for(let i=0; i<locationTable.length; i++){
        if(locationTable[i].id == item.id){
            //item was found
            return {
                databaseMessage: "Item was found.",
                item: locationTable[i],
            }
        }
    }

    //item was not found
    return {
        databaseMessage: "Item was not found.",
        item: null,
    }
}

const getItemFromSpaceshipTable = (item: {[key: string]: any}): {databaseMessage: string, item: Spaceship} => {
    for(let i=0; i<spaceshipTable.length; i++){
        if(spaceshipTable[i].id == item.id){
            //item was found
            return {
                databaseMessage: "Item was found.",
                item: spaceshipTable[i],
            }
        }
    }

    //item was not found
    return {
        databaseMessage: "Item was not found.",
        item: null,
    }
}

interface Location {
    id: string,
    cityName: string,
    planetName: string,
    totalAvailableCapacity: number,
    currentAmountOfCapacityUsed: number
}

interface Spaceship {
    id: string,
    name: string,
    model: string,
    locationID: string,
    status: string
}

let locationTable: Location[] = [
    {
        id: "ES",
        cityName: "Sydney",
        planetName: "Earth",
        totalAvailableCapacity: 500,
        currentAmountOfCapacityUsed: 0
    }
];

let spaceshipTable: Spaceship[] = [

]