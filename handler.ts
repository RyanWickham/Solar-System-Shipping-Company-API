import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from './src/service';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const result = service.hello(event);

  return apiResponse._200({result});
}

export const goodbye: APIGatewayProxyHandler = async (event, _context) => {
  const result = service.goodbye(event);

  return apiResponse._200({result});
}

const apiResponse = {
  _200: (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, 2),
    };
  },
  _400: (body) => {
    return {
      statusCode: 400,
      body: JSON.stringify(body, null, 2),
    };
  },
}