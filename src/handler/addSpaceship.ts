import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import {IOHandler, IOErrorMessages} from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const spaceshipToAdd = IOHandler.bodyJSON(event);

    //error checking to ensure the passes paramaters are correct
    const errorResult: {statusCode: number, body: string} = errorChecking(spaceshipToAdd);

    if(errorResult.statusCode != 200){
        return errorResult;
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.addSpaceship(spaceshipToAdd);
    return IOHandler.returnSuccess(result);
}

const errorChecking = (spaceshipToAdd: {[key: string]: any}): {statusCode: number, body: string} => {
    //Make sure each element needed was included in request
    if(!spaceshipToAdd.id || !spaceshipToAdd.name || !spaceshipToAdd.model || !spaceshipToAdd.locationID || !spaceshipToAdd.status){
        return IOHandler.returnError400(IOErrorMessages.missingItemMessage);
    }

    //type gard to ensure that each paramater is of correct type
    if(typeof spaceshipToAdd.id != 'string' || typeof spaceshipToAdd.name != 'string' || typeof spaceshipToAdd.model != 'string' ||
        typeof spaceshipToAdd.locationID != 'string' || typeof spaceshipToAdd.status != 'string'){
        return IOHandler.returnError400(IOErrorMessages.paramaterHasWrongTypeMessage);
    }

    //Make sure that status is only of type [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]
    if(spaceshipToAdd.status != 'DECOMMISSIONED' && spaceshipToAdd.status != 'MAINTENANCE' && spaceshipToAdd.status != 'OPERATIONAL'){
        return IOHandler.returnError400(IOErrorMessages.spaceshipStatusInvalidValue);
    }

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
}