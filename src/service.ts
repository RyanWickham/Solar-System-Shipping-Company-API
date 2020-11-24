export default {
    hello: data => {
        return 'HELLO - ' + data.name + " " + data.age;
    },
    addLocation: data => {
        return {
            message: 'Location Added: ID: ' + data.id + ', cityName: ' + data.cityName + ', planetName: ' + data.planetName + ".",
        }
    }
}