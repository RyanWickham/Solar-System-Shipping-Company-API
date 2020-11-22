import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map0support/register';

import { Spaceship } from '../Interface/SpaceShipInterface';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    // const spaceship = event.pathParameters?.spaceship;

    // if(!spaceship){//error -> no spaceship provided
    //     return apiResponses._400({message: 'missing parameters'});
    // }

    //input is correct
    return apiResponses._200({message: 'correct parameters, good boy :D'});
}

const apiResponses = {
    _200: (body: { [key: string]: any}) => {
        return {
            statusCode: 200,
            body: JSON.stringify(body, null, 2),
        };
    },
    _400: (body: { [key: string]: any}) => {
        return {
            statusCode: 400,
            body: JSON.stringify(body, null, 2),
        };
    },
}