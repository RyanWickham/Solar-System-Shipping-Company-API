export interface Location {
    id: string,
    cityName: string,
    planetName: string,
    totalAvailableCapacity: number,
    currentAmountOfCapacityUsed: number
}

export interface Spaceship {
    id: string,
    name: string,
    model: string,
    locationID: string,
    status: string
}

export let locationTable: Location[] = [
    {
        id: "ES",
        cityName: "Sydney",
        planetName: "Earth",
        totalAvailableCapacity: 500,
        currentAmountOfCapacityUsed: 0
    }
];

export let spaceshipTable: Spaceship[] = [

]

export const reconstructLocationTable = (newTable) => {
    locationTable = newTable;
}

export const reconstructSpaceshipTable = (newTable) => {
    spaceshipTable = newTable;
} 