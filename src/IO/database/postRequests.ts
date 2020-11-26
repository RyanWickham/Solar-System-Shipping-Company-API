import { locationTable, spaceshipTable, Location, Spaceship } from "./tables";
import io from "../index";

export const addToTable = (tableName: string, item: {[key: string]: any}): {databaseMessage: string} => {
    switch(tableName){
        case io.database.tableNames.locations:
            return addItemToLocationTable(item);
        case io.database.tableNames.spaceships:
            return addItemToSpaceshipTable(item);
        default:
            return {
                databaseMessage: "Error: table was not found, item could not be added."
            }
    }
}

const addItemToLocationTable = (item: {[key: string]: any}): {databaseMessage: string, itemAlreadyAdded: boolean} => {
    //check if item already exists
    for(let i=0; i<locationTable.length; i++){
        if(locationTable[i].id === item.id){
            //item exists
            return {
                databaseMessage: "Item already exists, did not add item.",
                itemAlreadyAdded: true,
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
        databaseMessage: "Item was added successfuly.",
        itemAlreadyAdded: false,
    }
}

const addItemToSpaceshipTable = (item: {[key: string]: string}): {databaseMessage: string, itemAlreadyAdded: boolean} => {
    //check if item already exists
    for(let i=0; i<spaceshipTable.length; i++){
        if(spaceshipTable[i].id === item.id){
            //item exists
            return {
                databaseMessage: "Item already exists, did not add item.",
                itemAlreadyAdded: true,
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
        databaseMessage: "Item was added successfuly.",
        itemAlreadyAdded: false,
    }
}
