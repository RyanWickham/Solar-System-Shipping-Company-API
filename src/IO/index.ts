export const IOHandler = {
    bodyJSON: data => JSON.parse(data.body),

    returnSuccess: data => ({
        statusCode: 200,
        body: JSON.stringify(data, null, 2),
    }),

    returnError400: data => ({
        statusCode: 400,
        body: JSON.stringify(data, null, 2),
    }),
}

export const IOErrorMessages = {
    missingItemMessage: {message: "ERROR request does not include all required paramaters. Try '/location/help' to see requirements"},
    paramaterHasWrongTypeMessage: {message: "ERROR a paramater provided is of wrong type. Try '/location/help' to see requirements"},
    invalidLocationCapacityMessage: {message: "ERROR more items are in location than the capacity is allowed -> currentAmountOfCapacityUsed > totalAvailableCapacity"},
    spaceshipStatusInvalidValue: {message: "Error status can only be of values [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"},
}