export const addLocationService = async (io: {[key: string]: any}, 
        data: {id: string, cityName: string, planetName, totalAvailableCapacity: number, currentAmountOfCapacityUsed: number}) => {
    
    //check if record id already exists
    const locationGetResponse = await io.databaseMessage.get(io.database.tableNames.locations, data.id);
    
    //locationGetResponse.item is an object, if an item is found the object will be filled with location data else it will be {}
    if(locationGetResponse.item != null){
        return {
            message: "Location Added: ID: " + data.id + ", already exists.",
            response: {
                locationGetResponse: locationGetResponse,
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

    //create record to add/send to database
    const locationPostResponse = await io.database.post(
        io.database.tableNames.locations,
        {
            id: data.id,
            cityName: data.cityName,
            planetName: data.planetName,
            totalAvailableCapacity: data.totalAvailableCapacity,
            currentAmountOfCapacityUsed: data.currentAmountOfCapacityUsed
        }
    );

    //check if post request was successful
    if(locationPostResponse.errorOccured || !locationPostResponse.itemAddedSuccessfuly){
        return {
            message: "An error occured with put request to database.",
            response: {
                locationGetResponse: locationGetResponse,
                locationPostResponse: locationPostResponse
            }
        }
    }

    return {
        message: "Location Added: ID: " + data.id + ", city name: " + data.cityName + ", planet name: " + data.planetName
            + ", total capacity: " + data.totalAvailableCapacity + ", curent amount of space used: " + data.currentAmountOfCapacityUsed,
        response: {
            locationPostResponse: locationPostResponse,
        }
    }
}

export const deleteLocationService = async (io: {[key: string]: any}, data: {id: string}) => {
    //check if there are any spaceships at this location
    const locationGetResponse = await io.database.get(io.database.tableNames.locations, data.id);

    if(locationGetResponse.item == null){
        return {
            message: "Location with ID: " + data.id + ", does not exists.",
            response: {
                locationGetResponse: locationGetResponse,
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

    //check if there is currently any spaceships at this locaiton
    if(locationGetResponse.item.currentAmountOfCapacityUsed > 0){
        return {
            message: "Location with ID: " + data.id + ", currently has spaceships being stored -> can not be deleted.",
            response: {
                locationGetResponse: locationGetResponse,
            }
        }
    }

    //create record to delete/send to database
    const locationDeleteResponse = await io.database.delete(io.database.tableNames.locations, data.id);
    
    if(!locationDeleteResponse.itemWasDeleted){
        return {
            message: "Location with ID: " + data.id + ", was not found and could not be deleted.",
            response: {
                locationGetResponse: locationGetResponse,
                locationDeleteResponse: locationDeleteResponse,
            }
        }

    }else if(locationDeleteResponse.errorOccured){
        return {
            message: "An error occured when submitting an delete request to the database.",
            response: {
                locationGetResponse: locationGetResponse,
                locationDeleteResponse: locationDeleteResponse,
            }
        }
    }

    return {
        message: "Location with ID: " + data.id + ", was sent to be deleted.",
        response: {
            locationGetResponse: locationGetResponse,
            locationDeleteResponse: locationDeleteResponse,
        }
    }
}

export const locationHelpService = () => {
    return {
        message: "Location Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /location.",
        addLocation: {
            path: '/locations/{locationID}',
            HTTPStatusCode: 'post',
            requiredJSON:  {
                id: 'required string',
                cityName: 'required string',
                planetName: 'required string',
                totalAvailableCapacity: 'required number',
                currentAmountOfCapacityUsed: 'optional number -> default to 0, currentAmountOfCapacityUsed <= totalAvailableCapacity'
            },
        },
        removeLocation: {
            path: '/locations/{locationID}',
            HTTPStatusCode: 'delete',
            requiredJSON: {
                id: 'required string -> id of location to be deleted'
            },
        },
        
    }
}