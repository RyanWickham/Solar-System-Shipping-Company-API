import { locationTable, spaceshipTable, Location, Spaceship } from "./tables";
import io from "../index";

export const getFromTable = (tableName: string, key: {[key: string]: any}): {databaseMessage: string} => {
    switch(tableName){
        case io.database.tableNames.locations:
            return getItemFromLocationTable(key);
        case io.database.tableNames.spaceships:
            return getItemFromSpaceshipTable(key);
        default:
            return {
                databaseMessage: "Error: table was not found, item was not added."
            }
    }
}

const getItemFromLocationTable = (item: {[key: string]: any}): {databaseMessage: string, item: Location} => {
    //check if item exists
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
    //check if item exists
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