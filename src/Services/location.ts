export const addLocationService = async (io: {[key: string]: any}, 
        data: {id: string, cityName: string, planetName, totalAvailableCapacity: number, currentAmountOfCapacityUsed: number}) => {

    //create record to add/send to database
    const locationPostResponse = await io.database.post({
        tableName: io.database.tableNames.locations,
        item: data
    });

    //check if item alread exists
    if(locationPostResponse.itemAlreadyAdded){
        return {
            message: "Location Added: ID: " + data.id + ", already exists.",
            response: {
                locationPostResponse: locationPostResponse,
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
    const locationGetResponse = await io.database.get({
        tableName: io.database.tableNames.locations,
        item: data
    });

    if(locationGetResponse.item == null){
        return {
            message: "Location with ID: " + data.id + ", does not exists.",
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
    const locationDeleteResponse = await io.database.delete({
        tableName: io.database.tableNames.locations,
        item: data
    });
    
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