import { locationTable, spaceshipTable} from "./tables";
import io from "../index";

export const changeItemInTable = (tableName: string, item: {[key: string]: any}): {databaseMessage: string} => {
    switch(tableName){
        case io.database.tableNames.locations:
            return changeItemInLocationTable(item);
        case io.database.tableNames.spaceships:
            return changeItemInSpaceshipTable(item);
        default:
            return {
                databaseMessage: "Error: table was not found, item was not added."
            }
    }
}

const changeItemInLocationTable = (item: {[key: string]: any}): {databaseMessage: string} => {
    //check if item exists
    for(let i=0; i<locationTable.length; i++){
        if(locationTable[i].id == item.id){
            //item was found
            //decided what item to edit -> should only be used to change currentAmountOfCapacityUsed
            locationTable[i].currentAmountOfCapacityUsed = item.operation;//operation will either be +1 or -1

            return {
                databaseMessage: "Location: " + locationTable[i].id + ", " + item.operation + " current amount in used.";
            }
        }
    }

    //item was not found
    return {
        databaseMessage: "Item was not found."
    }
}

const changeItemInSpaceshipTable = (item: {[key: string]: string}): {databaseMessage: string} => {
    //check if item exists
    for(let i=0; i<spaceshipTable.length; i++){
        if(spaceshipTable[i].id == item.id){
            //item was found
            //decided what item to edit -> should only be called with status
            const oldStatus = spaceshipTable[i].status;
            spaceshipTable[i].status = item.newStatus;

            return {
                databaseMessage: "Status of: " + spaceshipTable[i] + ", was changed from " + oldStatus + " to " + spaceshipTable[i].status + ".",
            }
        }
    }

    //item was not found
    return {
        databaseMessage: "Item was not found."
    }
}
