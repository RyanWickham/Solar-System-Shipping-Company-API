
export const addSpaceshipService = async (io: {[key: string]: any}, data: {id: string, name: string, model: string, locationID: string, status: string}) => {
    
    //check to make sure locatonID is valid
    const locationIDResponse = await io.database.get({
        tableName: io.database.tableNames.locations,
        item: {id: data.locationID}
    });

    if(locationIDResponse.item == null){
        //invalid locationID
        return {
            message: "Invalid locationID: locationID is not linked to any location.",
        }
    }

    //create spaceship record to add/send to database
    const spaceshipAddingResult = await io.database.post({
        tableName: io.database.tableNames.spaceships,
        item: data
    });

    //if the spaceship is added -> increase the capacity
    if(!spaceshipAddingResult.itemAlreadyAdded){
        //Update capacity of location to +1
        const locationIncreaseCapacityResponse = await io.database.put({
            tableName: io.database.tableNames.locations,
            item: {
                id: data.locationID,
                operation: io.database.capacityOperations.increase,
            },
        });

        //need a return here to include the locationIncreaseCapacityResponse
        return {
            message: "Spaceship Added: ID: " + data.id + ", name: " + data.name + ", model: " + data.model
            + ", Location ID " + data.locationID + ", status: " + data.status,
            response: {
                spaceshipAddingResponse: spaceshipAddingResult,
                locationIncreaseCapacityResponsse: locationIncreaseCapacityResponse,
            }
        }
    }
    
    //item wasn't added -> no need for locationIncreaseCapacityResponse
    return {
        message: "Spaceship Added: ID: " + data.id + ", name: " + data.name + ", model: " + data.model
        + ", Location ID " + data.locationID + ", status: " + data.status,
        response: {
            spaceshipAddingResponse: spaceshipAddingResult,
        }
    }
}

export const updateSpaceshipStatusService = async (io: {[key: string]: any}, data: {id: string, newStatus: string}) => {
    return {
        message: "Spaceship with ID: " + data.id + ", was sent to have it's status to: " + data.newStatus + ".",
    }
}

export const deleteSpaceshipService = async (io: {[key: string]: any}, data: {id: string}) => {
    //get item's locationID -> used to adjuest location
    const spaceshipGetResult = await io.database.get({
        tableName: io.database.tableNames.spaceships,
        item: {id: data.id}
    });

    //check if item exists
    if(spaceshipGetResult.item == null){
        return {
            message: "Spaceship with ID: " + data.id + ", was not found -> could not delete.",
            response: {
                spaceshipGetResponse: spaceshipGetResult,
            },
        }
    }

    //create spaceship record to delete
    const spaceshipDeleteResult = await io.database.delete({
        tableName: io.database.tableNames.spaceships,
        item: data
    });
    
    //if item was deleted -> decreas location capacity
    if(spaceshipDeleteResult.itemWasDeleted){
        //Update capacity of location to +1
        const locationIncreaseCapacityResponse = await io.database.put({
            tableName: io.database.tableNames.locations,
            item: {
                id: spaceshipGetResult.item.locationID,
                operation: io.database.capacityOperations.decrease,
            },
        });

        return {
            message: "Spaceship with ID: " + data.id + ", was sent to be deleted.",
            response: {
                spaceshipAddingResponse: spaceshipDeleteResult,
                locationIncreaseCapacityResponse: locationIncreaseCapacityResponse,
            },
        }
    }

    return {
        message: "Spaceship with ID: " + data.id + ", was not deleted.",
        response: {
            spaceshipAddingResponse: spaceshipDeleteResult,
        }
    }
}

export const spaceshipHelpService = () => {
    return {
        message: "Spaceship Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /spaceship.",
        addSpaceship: {
            path: '/spaceship',
            HTTPStatusCode: 'post',
            requiredJSON: {
                id: 'required string',
                name: 'required string',
                model: 'required string',
                locationID: 'required string',
                status: "required string [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"
            },
        },
        updateStatus: {
            path: '/spaceship/status',
            HTTPStatusCode: 'put',
            requiredJSON: {
                id: 'required string',
                newStatus: "required string [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"
            },
        },
        deleteSpaceship: {
            path: '/spaceship',
            HTTPStatusCode: 'delete',
            requiredJSON: {
                id: 'required string -> id of spaceship to be deleted'
            },
        }
    }
}