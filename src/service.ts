export default {
    addLocation: data => {
        return {
            message: 'Location Added: ID: ' + data.id + ', city name: ' + data.cityName + ', planet name: ' + data.planetName
                + ", total capacity: " + data.totalAvailableCapacity + ", curent available space: " + data.currentAvailableSpace,
        }
    }
}