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
    {
        id: "addLocationTest1",
        cityName: "testCity",
        planetName: "testPlanet",
        totalAvailableCapacity: 400,
        currentAmountOfCapacityUsed: 0
    },
    {
        id: "deleteLocationTest1",
        cityName: "testCity",
        planetName: "testPlanet",
        totalAvailableCapacity: 400,
        currentAmountOfCapacityUsed: 200
    },
    {
        id: "removeLocationTest3",
        cityName: "testCity",
        planetName: "testPlanet",
        totalAvailableCapacity: 400,
        currentAmountOfCapacityUsed: 0
    },
    {
        id: "travelTest4",
        cityName: "testCity",
        planetName: "testPlanet",
        totalAvailableCapacity: 400,
        currentAmountOfCapacityUsed: 400
    },
    {
        id: "travelTest5",
        cityName: "testCity",
        planetName: "testPlanet",
        totalAvailableCapacity: 400,
        currentAmountOfCapacityUsed: 100
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
    {
        id:"updateStatusTest1",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"OPERATIONAL"
    },
    {
        id:"updateStatusTest2",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"OPERATIONAL"
    },
    {
        id:"updateStatusTest3",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"OPERATIONAL"
    },
    {
        id:"updateStatusTest4",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"OPERATIONAL"
    },
    {
        id:"updateStatusTest5",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"MAINTENANCE"
    },
    {
        id:"updateStatusTest6",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"MAINTENANCE"
    },
    {
        id:"updateStatusTest7",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"MAINTENANCE"
    },
    {
        id:"updateStatusTest8",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"DECOMMISSIONED"
    },
    {
        id:"updateStatusTest9",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"DECOMMISSIONED"
    },
    {
        id:"updateStatusTest10",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"DECOMMISSIONED"
    },
    {
        id:"travelTest3",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"OPERATIONAL"
    },
    {
        id:"travelTest6",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"MAINTENCE"
    },
    {
        id:"travelTest7",
        name:"ssApple",
        model:"ssmodel",
        locationID:"ES",
        status:"DECOMMISSIONED"
    },
]

export const reconstructLocationTable = (newTable) => {
    locationTable = newTable;
}

export const reconstructSpaceshipTable = (newTable) => {
    spaceshipTable = newTable;
} 