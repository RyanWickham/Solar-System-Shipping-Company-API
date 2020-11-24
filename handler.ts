import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from './src/service';
import {IOHandler} from './src/IO/index';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const input = IOHandler.bodyJSON(event);
  
  const result = service.hello(input);

  return IOHandler.returnSuccess(result);
}

export const addLocation: APIGatewayProxyHandler = async (event, _context) => {
  //gets the body of the event as a JSON object
  const locationToAdd = IOHandler.bodyJSON(event);

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

  //sends the location off to be be delt with -> returns an a message to be sent to the client
  const result = service.addLocation(locationToAdd);
  return IOHandler.returnSuccess(result);
}