export const spaceshipTravelToService = (data: {spaceshipID: string, distinationID: string}) => {
    return {
        message: "Spaceship ID: " + data.spaceshipID + ", traveling to location ID: " + data.distinationID + "."
    }
}

// export const locationHelpService = () => {
//     return {
//         message: "Location Help: The following obejects are the parmaters of what is required to submit the corrasponding HTTP requests on /location.",
//         addLocation: {
//             path: '/location',
//             HTTPStatusCode: 'post',
//             requiredJSON:  {
//                 id: 'required string',
//                 cityName: 'required string',
//                 planetName: 'required string',
//                 totalAvailableCapacity: 'required number',
//                 currentAmountOfCapacityUsed: 'optional number -> default to 0, currentAmountOfCapacityUsed <= totalAvailableCapacity'
//             },
//         },
//     }
// }