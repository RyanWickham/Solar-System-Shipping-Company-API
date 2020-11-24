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
    const locationToAdd: {id: string, cityName: string, planetName, totalAvailableCapacity: number, currentAmountOfCapacityUsed: number} = {
        id: locationData.id,
        cityName: locationData.cityName,
        planetName: locationData.planetName,
        totalAvailableCapacity: locationData.totalAvailableCapacity,
        currentAmountOfCapacityUsed: locationData.currentAmountOfCapacityUsed
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.addLocation(locationToAdd);
    return IOHandler.returnSuccess(result);
}

const errorChecking = (locationData: {[key: string]: any}): {statusCode: number, body: string} => {
    //Make sure each element needed was included in request
    if(!locationData.id || !locationData.cityName || !locationData.planetName || !locationData.totalAvailableCapacity){
        return IOHandler.returnError400(IOErrorMessages.missingItemMessage);
    }

    //type gard to ensure that each paramater is of correct type
    IOHandler.stringErrorChecking(locationData.id);
    IOHandler.stringErrorChecking(locationData.cityName);
    IOHandler.stringErrorChecking(locationData.planetName);

    if(typeof locationData.totalAvailableCapacity != 'number'){
        return IOHandler.returnError400(IOErrorMessages.paramaterHasWrongTypeMessage);
    }

    //currentAmountOfCapacityUsed is optional and need extra checks
    if(!locationData.currentAmountOfCapacityUsed){
        locationData.currentAmountOfCapacityUsed = 0;

    }else if(typeof locationData.currentAmountOfCapacityUsed != 'number'){//check it is a number
        return IOHandler.returnError400(IOErrorMessages.paramaterHasWrongTypeMessage);

    }
    
    //check the capacity limit is correct
    if(locationData.currentAmountOfCapacityUsed > locationData.totalAvailableCapacity){
        //more items are in location than the capacity is allowed
        return IOHandler.returnError400(IOErrorMessages.invalidLocationCapacityMessage);
    }

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
}