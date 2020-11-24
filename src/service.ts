
const addLocationService = (data) => {
    return {
        message: "Location Added: ID: " + data.id + ", city name: " + data.cityName + ", planet name: " + data.planetName
            + ", total capacity: " + data.totalAvailableCapacity + ", curent amount of space used: " + data.currentAmountOfCapacityUsed,
    }
}

const deleteLocationService = (data) => {
    return {
        message: "Location with ID: " + data.id + ", was sent to be deleted."
    }
}

const locationHelpService = () => {
    return {
        message: "Location Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /Location.",
        post: {
            id: 'required string',
            cityName: 'required string',
            planetName: 'required string',
            totalAvailableCapacity: 'required number',
            currentAmountOfCapacityUsed: 'optional number -> default to 0, currentAmountOfCapacityUsed <= totalAvailableCapacity'
        },
        delete: {
            id: 'required string -> id of location to be deleted'
        }
    }
}

export default {
    addLocation: addLocationService,
    deleteLocation: deleteLocationService,
    locationHelp: locationHelpService,
}