import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import io from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = service.spaceshipHelp();
    return io.handler.returnSuccess(result);
}