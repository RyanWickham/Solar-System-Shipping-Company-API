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
        currentAmountOfCapacityUsed: 3
    },
    {
        id: "addSpaceshipTest4",
        cityName: "testCity",
        planetName: "testPlanet",
        totalAvailableCapacity: 1,
        currentAmountOfCapacityUsed: 1
    },
];

export let spaceshipTable: Spaceship[] = [
    {
        id: "ss",
        name:"ss",
        model:"ssmodel",
        locationID:"ES",
        status:"MAINTENANCE"
    },
    {
        id:"addTest2",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"OPERATIONAL"
    },
    {
        id:"removeSpaceshipTest1",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"OPERATIONAL"
    },
]

export const reconstructLocationTable = (newTable) => {
    locationTable = newTable;
}

export const reconstructSpaceshipTable = (newTable) => {
    spaceshipTable = newTable;
} 