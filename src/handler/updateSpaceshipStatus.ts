import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import io from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const spaceshipData = io.handler.bodyJSON(event);

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
    const result = service.updateSpaceshipStatus(io, spaceshipToUpdate);
    return io.handler.returnSuccess(result);
}

const errorChecking = (spaceshipData: {[key: string]: any}): {statusCode: number, body: string} => {
    //check if id and newStatus was provided
    if(!spaceshipData.id || !spaceshipData.newStatus){
        return io.handler.returnError400(io.IOErrorMessages.missingItemMessage);
    }

    //type gard to ensure that each paramater is of correct type
    io.handler.stringErrorChecking(spaceshipData.id);
    io.handler.stringErrorChecking(spaceshipData.newStatus);

    //Make sure that newStatus is only of type [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]
    if(spaceshipData.newStatus != 'DECOMMISSIONED' && spaceshipData.newStatus != 'MAINTENANCE' && 
        spaceshipData.newStatus != 'OPERATIONAL'){

        return io.handler.returnError400(io.IOErrorMessages.spaceshipStatusInvalidValue);
    }

    return io.handler.returnSuccess('');//use as a dummy response to signify no errors
}