import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import {IOHandler, IOErrorMessages} from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const locationData = IOHandler.bodyJSON(event);

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
    return IOHandler.returnSuccess(result);
}

const errorChecking = (locationData: {[key: string]: any}): {statusCode: number, body: string} => {
    //check if id was provided
    if(!locationData.id){
        return IOHandler.returnError400(IOErrorMessages.missingItemMessage);
    }

    //check if id is correct type
    if(typeof locationData.id != 'string'){
        return IOHandler.returnError400(IOErrorMessages.paramaterHasWrongTypeMessage);
    }

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
}