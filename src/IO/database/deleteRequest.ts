import { locationTable, spaceshipTable, reconstructLocationTable, reconstructSpaceshipTable } from "./tables";
import io from "../index";

export const deleteFromTable = (tableName: string, item: {[key: string]: any}): {databaseMessage: string} => {
    switch(tableName){
        case io.database.tableNames.locations:
            return deleteItemFromLocationTable(item);
        case io.database.tableNames.spaceships:
            return deleteItemFromSpaceshipTable(item);
        default:
            return {
                databaseMessage: "Error: table was not found, item was not added."
            }
    }
}

const deleteItemFromLocationTable = (item: {[key: string]: any}): {databaseMessage: string} => {
    //check if item exists
    for(let i=0; i<locationTable.length; i++){
        if(locationTable[i].id == item.id){
            //item was found
            //delete item
            const tableWithoutRemovedItem = locationTable.filter(element => element.id != item.id);
            reconstructLocationTable(tableWithoutRemovedItem);

            return {
                databaseMessage: "Item was Deleted."
            }
        }
    }

    //item was not found
    return {
        databaseMessage: "Item was not found -> did not delete."
    }
}

const deleteItemFromSpaceshipTable = (item: {[key: string]: string}): {databaseMessage: string} => {
    //check if item exists
    for(let i=0; i<spaceshipTable.length; i++){
        if(spaceshipTable[i].id == item.id){
            //item was found
            //delete item
            const tableWithoutRemovedItem = spaceshipTable.filter(element => element.id != item.id);
            reconstructSpaceshipTable(tableWithoutRemovedItem);

            return {
                databaseMessage: "Item was Deleted."
            }
        }
    }

    //item was not found
    return {
        databaseMessage: "Item was not found -> did not delete."
    }
}
