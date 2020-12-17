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
    const spaceshipToRemove: {id: string} = {
        id: spaceshipData.id
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = await service.deleteSpaceship(io, spaceshipToRemove);
    return io.handler.returnSuccess(result);
}

const errorChecking = (spaceshipData: {[key: string]: any}): {statusCode: number, body: string} => {
    //check if id was provided
    if(!spaceshipData.id){
        return io.handler.returnError400(io.IOErrorMessages.missingItemMessage);
    }

    //type gard to ensure that each paramater is of correct type
    let result:{statusCode: number, body: string} = io.handler.stringErrorChecking(spaceshipData.id);
    if(result.statusCode != 200) return result;

    return io.handler.returnSuccess('');//use as a dummy response to signify no errors
}