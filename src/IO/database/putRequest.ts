import { locationTable, spaceshipTable} from "./tables";
import io from "../index";
import { dynamo } from "../db";

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
            if(item.operation == dynamo.capacityOperations.increase){
                locationTable[i].currentAmountOfCapacityUsed += 1;
            }else if(item.operation == dynamo.capacityOperations.decrease){
                locationTable[i].currentAmountOfCapacityUsed -= 1;
            }
            

            return {
                databaseMessage: "Location: " + locationTable[i].id + ", " + item.operation + " current amount in used. (" + locationTable[i].currentAmountOfCapacityUsed + ")",
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
            //decided what item to edit
            if(item.type == io.spaceshipValueUpdateValues.status){
                const oldStatus = spaceshipTable[i].status;
                spaceshipTable[i].status = item.value;

                return {
                    databaseMessage: "Status of: " + spaceshipTable[i].id + ", was changed from " + oldStatus + " to " + spaceshipTable[i].status + ".",
                }

            }else if(item.type == io.spaceshipValueUpdateValues.locationID){
                const oldlocation = spaceshipTable[i].locationID;
                spaceshipTable[i].locationID = item.value;

                return {
                    databaseMessage: "LocationID of: " + spaceshipTable[i].id + ", was changed from " + oldlocation + " to " + spaceshipTable[i].locationID + ".",
                }
            }
            
        }
    }

    //item was not found
    return {
        databaseMessage: "Item was not found."
    }
}
