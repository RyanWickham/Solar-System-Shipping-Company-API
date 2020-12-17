export const spaceshipTravelToService = async (io: {[key: string]: any}, data: {spaceshipID: string, distinationID: string}) => {
    const spaceshipGetResponse = await io.databaseMessage.get(io.database.tableNames.spaceships, data.spaceshipID);
    
    //get the spaceship's status to check if it is operational
    if(spaceshipGetResponse.item == null){
        return {
            message: "Spaceship ID: " + data.spaceshipID + ", does not exists.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
            }
        }

    }else if(spaceshipGetResponse.errorOccured){
        return {
            message: "An error occured with the request to database.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
            }
        }
    }

    
    //spaceships can only change location if their status == operational
    if(spaceshipGetResponse.item.status != io.spaceshipStatusValues.operational){
        return {
            message: "Spaceship with ID: " + data.spaceshipID + ", status is not operational -> can not travel.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
            }
        }
    }

    // get the destination location and determine if it has the capacity for a new spaceship
    const locationGetResponse = await io.databaseMessage.get(io.database.tableNames.locations, data.distinationID);
    
    //get the spaceship's status to check if it is operational
    if(locationGetResponse.item == null){
        return {
            message: "Distination location with ID: " + data.distinationID + ", does not exists.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                locationGetResponse: locationGetResponse,
            }
        }

    }else if(locationGetResponse.errorOccured){
        return {
            message: "An error occured with the request to database.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                locationGetResponse: locationGetResponse,
            }
        }
    }

    //Check if distination has capacity for another spaceship
    if(locationGetResponse.item.currentAmountOfCapacityUsed >= locationGetResponse.item.totalAvailableCapacity){
        //not enough space for a new spaceship
        return {
            message: "Destination with location ID: " + data.distinationID + ", does not have enough capacity for another spaceship.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                locationGetResponse: locationGetResponse,
            }
        }
    }

    //change ship location
    const shipChangeLocationResponse = await io.database.update(
        io.database.tableNames.spaceships, //table name
        data.spaceshipID, //primary key
        "locationID", //value to update
        io.database.capacityOperations.equals, //expression: '='|'+='|'-='
        data.distinationID //updated value 
        //operation will be => currentAmountOfCapacityUsed -= 1
    );

    if(shipChangeLocationResponse.errorOccured || !shipChangeLocationResponse.valuesWereUpdated){
        return {
            message: "An error occured within database while updating location capacity.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                locationGetResponse: locationGetResponse,
                shipChangeLocationResponse: shipChangeLocationResponse,
            }
        }
    }

    //old location current capacity -1
    const oldLocationIncreaseCapacityResponse = await io.database.update(
        io.database.tableNames.locations, //table name
        spaceshipGetResponse.item.locationID, //primary key
        "currentAmountOfCapacityUsed", //value to update
        io.database.capacityOperations.decrease, //expression: '='|'+='|'-='
        1 //updated value 
        //operation will be => currentAmountOfCapacityUsed -= 1
    );

    if(oldLocationIncreaseCapacityResponse.errorOccured || !oldLocationIncreaseCapacityResponse.valuesWereUpdated){
        return {
            message: "An error occured within database while updating location capacity.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                locationGetResponse: locationGetResponse,
                shipChangeLocationResponse: shipChangeLocationResponse,
                oldLocationIncreaseCapacityResponse: oldLocationIncreaseCapacityResponse
            }
        }
    }

    //new location current capacity +1
    const newLocationIncreaseCapacityResponse = await io.database.put({
        tableName: io.database.tableNames.locations,
        item: {
            id: data.distinationID,
            operation: io.database.capacityOperations.increase,
        },
    });

    const newLocationIncreaseCapacityResponse = await io.database.update(
        io.database.tableNames.locations, //table name
        data.distinationID, //primary key
        "currentAmountOfCapacityUsed", //value to update
        io.database.capacityOperations.increase, //expression: '='|'+='|'-='
        1 //updated value 
        //operation will be => currentAmountOfCapacityUsed -= 1
    );

    if(newLocationIncreaseCapacityResponse.errorOccured || !newLocationIncreaseCapacityResponse.valuesWereUpdated){
        return {
            message: "An error occured within database while updating location capacity.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                locationGetResponse: locationGetResponse,
                shipChangeLocationResponse: shipChangeLocationResponse,
                oldLocationIncreaseCapacityResponse: oldLocationIncreaseCapacityResponse,
                newLocationIncreaseCapacityResponse: newLocationIncreaseCapacityResponse
            }
        }
    }

    return {
        message: "Spaceship ID: " + data.spaceshipID + ", traveling to location ID: " + data.distinationID + ".",
        response: {
            spaceshipGetResponse: spaceshipGetResponse,
            locationGetResponse: locationGetResponse,
            shipChangeLocationResponse: shipChangeLocationResponse,
            oldLocationIncreaseCapacityResponse: oldLocationIncreaseCapacityResponse,
            newLocationIncreaseCapacityResponse: newLocationIncreaseCapacityResponse
        }
    }
}

export const travelHelpService = () => {
    return {
        message: "Travel Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /location.",
        spaceshipTravelTo: {
            path: '/travel',
            HTTPStatusCode: 'post',
            requiredJSON:  {
                spaceshipID: 'required string',
                distinationID: 'required string',
            },
        },
    }
}