export interface Location {
    locationID: String,
    cityName: String,
    planetName: String
    totalSpaceshipCapacity: number, //keep track of the total available space at this location
    currentSpaceshipCapacity: number, //keep track of the total space curenty being used at this location
}