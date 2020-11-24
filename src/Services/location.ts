export const addLocationService = async (io: {[key: string]: any}, 
        data: {id: string, cityName: string, planetName, totalAvailableCapacity: number, currentAmountOfCapacityUsed: number}) => {

    //create record to add/send to database
    const result = await io.database.put({
        tableName: io.database.tableNames.locations,
        item: data
    });

    return {
        message: "Location Added: ID: " + data.id + ", city name: " + data.cityName + ", planet name: " + data.planetName
            + ", total capacity: " + data.totalAvailableCapacity + ", curent amount of space used: " + data.currentAmountOfCapacityUsed,
        response: result,
    }
}

export const deleteLocationService = (io: {[key: string]: any}, data: {id: string}) => {
    return {
        message: "Location with ID: " + data.id + ", was sent to be deleted."
    }
}

export const locationHelpService = () => {
    return {
        message: "Location Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /location.",
        addLocation: {
            path: '/location',
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
            path: '/location',
            HTTPStatusCode: 'delete',
            requiredJSON: {
                id: 'required string -> id of location to be deleted'
            },
        },
        
    }
}