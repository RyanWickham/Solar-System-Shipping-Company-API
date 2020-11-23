import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from './src/service';
import {IOHandler} from './src/IO/index';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const input = IOHandler.input(event);
  
  const result = service.hello(input);

  return IOHandler.returnSuccess(result);
}

export const goodbye: APIGatewayProxyHandler = async (event, _context) => {
  const result = service.goodbye(event);

  return IOHandler.returnSuccess(result);
}