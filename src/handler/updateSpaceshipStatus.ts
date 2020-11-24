import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import {IOHandler, IOErrorMessages} from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const spaceshipData = IOHandler.bodyJSON(event);

    //error checking to ensure the passes paramaters are correct
    const errorResult: {statusCode: number, body: string} = errorChecking(spaceshipData);

    if(errorResult.statusCode != 200){
        return errorResult;
    }

    //create an object that only has the needed values -> errorChecking() made sure they exists
    const spaceshipToUpdate: {id: string, newStatus: string} = {
        id: spaceshipData.id,
        newStatus: spaceshipData.newStatus
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.updateSpaceshipStatus(spaceshipToUpdate);
    return IOHandler.returnSuccess(result);
}

const errorChecking = (spaceshipData: {[key: string]: any}): {statusCode: number, body: string} => {
    //check if id and newStatus was provided
    if(!spaceshipData.id || !spaceshipData.newStatus){
        return IOHandler.returnError400(IOErrorMessages.missingItemMessage);
    }

    //check if id and newStatus is correct type
    if(typeof spaceshipData.id != 'string' || typeof spaceshipData.newStatus != 'string'){
        return IOHandler.returnError400(IOErrorMessages.paramaterHasWrongTypeMessage);
    }

    //Make sure that newStatus is only of type [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]
    if(spaceshipData.newStatus != 'DECOMMISSIONED' && spaceshipData.newStatus != 'MAINTENANCE' && 
        spaceshipData.newStatus != 'OPERATIONAL'){

        return IOHandler.returnError400(IOErrorMessages.spaceshipStatusInvalidValue);
    }

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
}