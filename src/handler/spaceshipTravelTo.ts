import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import {IOHandler, IOErrorMessages} from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const travelData = IOHandler.bodyJSON(event);

    //error checking to ensure the passes paramaters are correct
    const errorResult: {statusCode: number, body: string} = errorChecking(travelData);

    if(errorResult.statusCode != 200){
        return errorResult;
    }

    //create an object that only has the needed values -> errorChecking() made sure they exists
    const travelInformation: {spaceshipID: string, distinationID: string} = {
        spaceshipID: travelData.spaceshipID,
        distinationID: travelData.distinationID
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.spaceshipTravelTo(travelInformation);
    return IOHandler.returnSuccess(result);
}

const errorChecking = (travelData: {[key: string]: any}): {statusCode: number, body: string} => {
    //check if spaceship ID and distination ID were provided
    if(!travelData.spaceshipID || !travelData.distinationID){
        return IOHandler.returnError400(IOErrorMessages.missingItemMessage);
    }

    //check if spaceship ID and distination ID is correct type
    IOHandler.stringErrorChecking(travelData.spaceshipID);
    IOHandler.stringErrorChecking(travelData.distinationID);

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
}
