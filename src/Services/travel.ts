export const spaceshipTravelToService = async (io: {[key: string]: any}, data: {spaceshipID: string, distinationID: string}) => {
    //get the spaceship's status to check if it is operational
    const spaceshipGetResult = await io.database.get({
        tableName: io.database.tableNames.spaceships,
        item: {id: data.spaceshipID}
    });

    //check if spaceship exists
    if(spaceshipGetResult.item == null){
        //no iteam was found
        return {
            message: "Spaceship with ID: " + data.spaceshipID + ", was not found.",
            response: {
                spaceshipGetResponse: spaceshipGetResult,
            }
        }
    }

    //spaceship exists
    //spaceships can only change location if their status == operational
    if(spaceshipGetResult.item.status != io.spaceshipStatusValues.operational){
        return {
            message: "Spaceship with ID: " + data.spaceshipID + ", status is not operational -> can not travel.",
            response: {
                spaceshipGetResponse: spaceshipGetResult,
            }
        }
    }

    // get the destination location and determine if it has the capacity for a new spaceship
    const locationGetResponse = await io.database.get({
        tableName: io.database.tableNames.locations,
        item: {id: data.distinationID}
    });

    //perform a check if destination location is valid
    if(locationGetResponse.item == null){
        //no location at this ID
        return {
            message: "Destination with location ID: " + data.distinationID + ", does not exists -> can not travel.",
            response: {
                spaceshipGetResult: spaceshipGetResult,
                locationGetResponse: locationGetResponse,
            }
        }
    }
    //current location is validated when spaceship was added -> no need to worry

    //Check if distination has capacity for another spaceship
    if(locationGetResponse.item.currentAmountOfCapacityUsed >= locationGetResponse.item.totalAvailableCapacity){
        //not enough space for a new spaceship
        return {
            message: "Destination with location ID: " + data.distinationID + ", does not have enough capacity for another spaceship.",
            response: {
                spaceshipGetResult: spaceshipGetResult,
                locationGetResponse: locationGetResponse,
            }
        }
    }

    //change ship location
    const shipChangeLocationResponse = await io.database.put({
        tableName: io.database.tableNames.spaceships,
        item: {
            id: data.spaceshipID,
            type: io.spaceshipValueUpdateValues.locationID,
            value: data.distinationID,
        },
    });

    //old location current capacity -1
    const oldLocationIncreaseCapacityResponse = await io.database.put({
        tableName: io.database.tableNames.locations,
        item: {
            id: spaceshipGetResult.item.locationID,
            operation: io.database.capacityOperations.decrease,
        },
    });

    //new location current capacity +1
    const newLocationIncreaseCapacityResponse = await io.database.put({
        tableName: io.database.tableNames.locations,
        item: {
            id: data.distinationID,
            operation: io.database.capacityOperations.increase,
        },
    });

    return {
        message: "Spaceship ID: " + data.spaceshipID + ", traveling to location ID: " + data.distinationID + ".",
        response: {
            spaceshipGetResult: spaceshipGetResult,
            locationGetResponse: locationGetResponse,
            shipChangeLocationResponse: shipChangeLocationResponse,
            oldLocationIncreaseCapacityResponse: oldLocationIncreaseCapacityResponse,
            newLocationIncreaseCapacityResponse: newLocationIncreaseCapacityResponse,
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