import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../service';
import {IOHandler} from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const locationToAdd = IOHandler.bodyJSON(event);

    //error checking to ensure the passes paramaters are correct
    const errorResult: {statusCode: number, body: string} = errorChecking(locationToAdd);

    if(errorResult.statusCode != 200){
        return errorResult;
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.addLocation(locationToAdd);
    return IOHandler.returnSuccess(result);
  }

  const errorChecking = (locationToAdd: {[key: string]: any}): {statusCode: number, body: string} => {
        //Make sure each element needed was included in request
        if(!locationToAdd.id || !locationToAdd.cityName || !locationToAdd.planetName || !locationToAdd.totalAvailableCapacity){
        return IOHandler.returnError400({
            message: "ERROR request does not include all required paramaters. Try '/location/help' to see requirements"
        });
    }

    //type gard to ensure that each paramater is of correct type
    if(typeof locationToAdd.id != 'string' || typeof locationToAdd.cityName != 'string' || typeof locationToAdd.planetName != 'string'){
        return IOHandler.returnError400({
            message: "ERROR request does not include all required paramaters. Try '/location/help' to see requirements"
        });
    }

    if(typeof locationToAdd.totalAvailableCapacity != 'number'){
        return IOHandler.returnError400({
            message: "ERROR request does not include all required paramaters. Try '/location/help' to see requirements"
        });
    }

    //currentAvailableSpace is optional and need extra checks
    if(!locationToAdd.currentAvailableSpace){
        locationToAdd.currentAvailableSpace = 0;

    }else if(locationToAdd.currentAvailableSpace > locationToAdd.totalAvailableCapacity){
        //more items are in location than the capacity is allowed
        return IOHandler.returnError400({
            message: "ERROR more items are in location than the capacity is allowed -> currentAvailableSpace > totalAvailableCapacity"
        });
    }

    return IOHandler.returnSuccess('');//use as a dummy response to signify no errors
  }