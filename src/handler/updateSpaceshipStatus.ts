import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import {IOHandler, IOErrorMessages} from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const spaceshipToUpdate = IOHandler.bodyJSON(event);

    //error checking to ensure the passes paramaters are correct
    const errorResult: {statusCode: number, body: string} = errorChecking(spaceshipToUpdate);

    if(errorResult.statusCode != 200){
        return errorResult;
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.updateSpaceshipStatus(spaceshipToUpdate);
    return IOHandler.returnSuccess(result);
}

const errorChecking = (spaceshipToUpdate: {[key: string]: any}): {statusCode: number, body: string} => {
    //check if id and newStatus was provided
    if(!spaceshipToUpdate.id || !spaceshipToUpdate.newStatus){
        return IOHandler.returnError400(IOErrorMessages.missingItemMessage);
    }

    //check if id and newStatus is correct type
    if(typeof spaceshipToUpdate.id != 'string' || typeof spaceshipToUpdate.newStatus != 'string'){
        return IOHandler.returnError400(IOErrorMessages.paramaterHasWrongTypeMessage);
    }

    //Make sure that newStatus is only of type [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]
    if(spaceshipToUpdate.newStatus != 'DECOMMISSIONED' && spaceshipToUpdate.newStatus != 'MAINTENANCE' && 
        spaceshipToUpdate.newStatus != 'OPERATIONAL'){

        return IOHandler.returnError400(IOErrorMessages.spaceshipStatusInvalidValue);
    }

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
}