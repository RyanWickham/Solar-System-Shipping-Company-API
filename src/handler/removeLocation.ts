import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import io from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const locationData = io.handler.bodyJSON(event);

    //error checking to ensure the passes paramaters are correct
    const errorResult: {statusCode: number, body: string} = errorChecking(locationData);

    if(errorResult.statusCode != 200){
        return errorResult;
    }

    //create an object that only has the needed values -> errorChecking() made sure they exists
    const locationToRemove: {id: string} = {
        id: locationData.id,
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.deleteLocation(locationToRemove);
    return io.handler.returnSuccess(result);
}

const errorChecking = (locationData: {[key: string]: any}): {statusCode: number, body: string} => {
    //check if id was provided
    if(!locationData.id){
        return io.handler.returnError400(io.IOErrorMessages.missingItemMessage);
    }

    //type gard to ensure that each paramater is of correct type
    io.handler.stringErrorChecking(locationData.id);


    return io.handler.returnSuccess('');//use as a dummy response to signify no errors
}