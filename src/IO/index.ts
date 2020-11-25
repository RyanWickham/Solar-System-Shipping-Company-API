import { dynamo } from './db';

const IOHandler = {
    bodyJSON: data => JSON.parse(data.body),

    returnSuccess: data => ({
        statusCode: 200,
        body: JSON.stringify(data, null, 2),
    }),

    returnError400: data => ({
        statusCode: 400,
        body: JSON.stringify(data, null, 2),
    }),

    stringErrorChecking: (item) => stringErrorChecking(item),
}

const IOErrorMessages = {
    missingItemMessage: (type: string) => ({message: "ERROR request does not include all required paramaters. Try '/"+type+"/help' to see requirements"}),
    paramaterHasWrongTypeMessage: (type: string) => ({message: "ERROR a paramater provided is of wrong type. Try '/"+type+"/help' to see requirements"}),
    invalidLocationCapacityMessage: {message: "ERROR more items are in location than the capacity is allowed -> currentAmountOfCapacityUsed > totalAvailableCapacity"},
    spaceshipStatusInvalidValue: {message: "Error status can only be of values [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]"},
    emptyString: {message: "ERROR a string paramaters is empty."},
}

const stringErrorChecking = (itemToCheck: any): {statusCode: number, body: string} => {
    //check if is type of string
    if(typeof itemToCheck != 'string'){
        return IOHandler.returnError400(IOErrorMessages.paramaterHasWrongTypeMessage);
    }

    //remove white space on start and end of item
    itemToCheck.trim();

    //check if there is still an item
    if(itemToCheck.length == 0){
        return IOHandler.returnError400(IOErrorMessages.emptyString);
    }

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
}

const spaceshipStatusValues = {
    decommissioned: "DECOMMISSIONED",
    maintenance: "MAINTENANCE",
    operational: "OPERATIONAL",
}

export default {
    handler: IOHandler,
    IOErrorMessages: IOErrorMessages,
    database: dynamo,
    spaceshipStatusValues: spaceshipStatusValues,
}