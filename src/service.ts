export default {
    addLocation: data => {
        return {
            message: 'Location Added: ID: ' + data.id + ', city name: ' + data.cityName + ', planet name: ' + data.planetName
                + ", total capacity: " + data.totalAvailableCapacity + ", curent amount of space used: " + data.currentAmountOfCapacityUsed,
        }
    }
}