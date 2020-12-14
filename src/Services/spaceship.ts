
export const addSpaceshipService = async (io: {[key: string]: any}, data: {id: string, name: string, model: string, locationID: string, status: string}) => {
    
    //check to make sure locatonID is valid
    const locationGetResponse = await io.database.get(io.database.tableNames.locations, data.id);

    if(locationGetResponse.item == null){
        //invalid locationID
        return {
            message: "Invalid locationID: " + data.locationID + ", is not linked to any location.",
            response: {
                locationGetResponse: locationGetResponse
            }
        }

    }else if(locationGetResponse.errorOccured){
        return {
            message: "An error occured with et request to database.",
            response: {
                locationGetResponse: locationGetResponse,
            }
        }
    }
    
    //check if the location can handle storing another spaceship
    if(locationGetResponse.item.currentAmountOfCapacityUsed >= locationGetResponse.item.totalAvailableCapacity){
        //no room for a spaceship to be added
        return {
            message: "Location: " + data.locationID + ", current capacity is fully, this spaceship can not be added.",
            response: {
                locationGetResponse: locationGetResponse
            }
        }
    }

    //check if an spaceship with this id already exists
    const spaceshipGetResponse = await io.databaseMessage.get(io.database.tableNames.locations, data.id);
    
    //locationGetResponse.item is an object, if an item is found the object will be filled with location data else it will be {}
    if(spaceshipGetResponse.item == null){
        return {
            message: "Location Added: ID: " + data.id + ", already exists.",
            response: {
                locationGetResponse: locationGetResponse,
                spaceshipGetResponse: spaceshipGetResponse,
            }
        }

    }else if(spaceshipGetResponse.errorOccured){
        return {
            message: "An error occured with et request to database.",
            response: {
                locationGetResponse: locationGetResponse,
                spaceshipGetResponse: spaceshipGetResponse,
            }
        }
    }

    //create spaceship record to add/send to database
    const spaceshipAddingResponse = await io.database.post(
        io.database.tableNames.spaceships,
        {
            id: data.id,
            name: data.name,
            model: data.model,
            locationID: data.locationID,
            status: data.status
        }
    );

    //check if post request was successful
    if(spaceshipAddingResponse.errorOccured || !spaceshipAddingResponse.itemAddedSuccessfuly){
        return {
            message: "An error occured with put request to database.",
            response: {
                locationGetResponse: locationGetResponse,
                spaceshipGetResponse: spaceshipGetResponse,
                spaceshipAddingResponse: spaceshipAddingResponse
            }
        }
    }

    //if the spaceship is added -> increase the capacity
    //Update capacity of location to +1
    const locationIncreaseCapacityResponse = await io.database.update(
        io.database.tableNames.spaceships, //table name
        data.id, //primary key
        "currentAmountOfCapacityUsed", //value to update
        io.database.capacityOperations.increase, //expression: '='|'+='|'-=' | '='
        1 //updated value 
        //operation will be => currentAmountOfCapacityUsed -= 1
    );

    if(locationIncreaseCapacityResponse.errorOccured || !locationIncreaseCapacityResponse.valuesWereUpdated){
        return {
            message: "An error occured within database while updating location capacity.",
            response: {
                locationGetResponse: locationGetResponse,
                spaceshipGetResponse: spaceshipGetResponse,
                spaceshipAddingResponse: spaceshipAddingResponse,
                locationIncreaseCapacityResponse: locationIncreaseCapacityResponse
            }
        }
    }

    //need a return here to include the locationIncreaseCapacityResponse
    return {
        message: "Spaceship added: ID: " + data.id + ", name: " + data.name + ", model: " + data.model
        + ", Location ID: " + data.locationID + ", status: " + data.status,
        response: {
            locationGetResponse: locationGetResponse,
            spaceshipGetResponse: spaceshipGetResponse,
            spaceshipAddingResponse: spaceshipAddingResponse,
            locationIncreaseCapacityResponse: locationIncreaseCapacityResponse
        }
    }
}

export const updateSpaceshipStatusService = async (io: {[key: string]: any}, data: {id: string, newStatus: string}) => {
    //Check if the spaceships exits
    const spaceshipGetResponse = await io.database.get(io.database.tableNames.spaceships, data.id);

    //check if item exists
    if(spaceshipGetResponse.item == null){
        return {
            message: "Spaceship with ID: " + data.id + ", was not found -> could not be deleted.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
            },
        }

    }else if(spaceshipGetResponse.errorOccured){
        return {
            message: "An error occured with et request to database.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
            }
        }
    }

    //error checking was already on on newStatus -> it is only a vaild status value
    const spaceshipUpdateStatusResponse = await io.database.update(
        io.database.tableNames.spaceships, //table name
        data.id, //primary key
        "status", //value to update
        io.database.updateOperations.equals, //expression: '='|'+='|'-=' | '='
        data.newStatus //updated value 
        //operation will be => status = :newStatus
    );

    if(spaceshipUpdateStatusResponse.errorOccured || !spaceshipUpdateStatusResponse.valuesWereUpdated){
        return {
            message: "An error occured within database while updating location capacity.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                spaceshipUpdateStatusResponse: spaceshipUpdateStatusResponse,
            }
        }
    }

    return {
        message: "Spaceship with ID: " + data.id + ", was sent to have it's status changed to: " + data.newStatus + ".",
        response: {
            spaceshipGetResponse: spaceshipGetResponse,
            spaceshipUpdateStatusResponse: spaceshipUpdateStatusResponse,
        }
    }
}

export const deleteSpaceshipService = async (io: {[key: string]: any}, data: {id: string}) => {
    //get item's locationID -> used to adjuest location
    const spaceshipGetResponse = await io.database.get(io.database.tableNames.spaceships, data.id);

    //check if item exists
    if(spaceshipGetResponse.item == null){
        return {
            message: "Spaceship with ID: " + data.id + ", was not found -> could not be deleted.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
            },
        }

    }else if(spaceshipGetResponse.errorOccured){
        return {
            message: "An error occured with et request to database.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
            }
        }
    }

    //create spaceship record to delete
    const spaceshipDeleteResult = await io.database.delete(io.database.tableNames.spaceships, data.id);

    if(!spaceshipDeleteResult.itemWasDeleted){
        return {
            message: "Spaceship with ID: " + data.id + ", was not found and could not be deleted.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                spaceshipDeleteResult: spaceshipDeleteResult,
            }
        }

    }else if(spaceshipDeleteResult.errorOccured){
        return {
            message: "An error occured when submitting an delete request to the database.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                spaceshipDeleteResult: spaceshipDeleteResult,
            }
        }
    }

    //if item was deleted -> decreas location capacity
    //Update capacity of location to -1
    const locationDecreaseCapacityResponse = await io.database.update(
        io.database.tableNames.locations, //table name
        spaceshipGetResponse.item.locationID, //primary key
        "currentAmountOfCapacityUsed", //value to update
        io.database.capacityOperations.decrease, //expression: '='|'+='|'-=' | '='
        1 //updated value 
        //operation will be => currentAmountOfCapacityUsed -= 1
    );

    if(locationDecreaseCapacityResponse.errorOccured || !locationDecreaseCapacityResponse.valuesWereUpdated){
        return {
            message: "An error occured within database while updating location capacity.",
            response: {
                spaceshipGetResponse: spaceshipGetResponse,
                spaceshipDeleteResponse: spaceshipDeleteResult,
                locationDecreaseCapacityResponse: locationDecreaseCapacityResponse,
            }
        }
    }

    return {
        message: "Spaceship with ID: " + data.id + ", was sent to be deleted.",
        response: {
            spaceshipGetResponse: spaceshipGetResponse,
            spaceshipDeleteResponse: spaceshipDeleteResult,
            locationDecreaseCapacityResponse: locationDecreaseCapacityResponse,
        },
    }
}

export const spaceshipHelpService = () => {
    return {
        message: "Spaceship Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /spaceship.",
        addSpaceship: {
            path: '/spaceships/{spaceshipID}',
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
            path: '/spaceship/statuss/{spaceshipID}',
            HTTPStatusCode: 'put',
            requiredJSON: {
                id: 'required string',
                newStatus: "required string [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"
            },
        },
        deleteSpaceship: {
            path: '/spaceships/{spaceshipID}',
            HTTPStatusCode: 'delete',
            requiredJSON: {
                id: 'required string -> id of spaceship to be deleted'
            },
        }
    }
}