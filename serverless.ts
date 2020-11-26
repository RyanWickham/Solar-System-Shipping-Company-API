import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'stomble-backend-internship',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },

  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'ap-southeast-2',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },

  functions: {
    addLocation: {
      handler: './src/handler/addLocation.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'locations/{locationID}',
          }
        }
      ]
    },
    removeLocation: {
      handler: './src/handler/removeLocation.handler',
      events: [
        {
          http: {
            method: 'delete',
            path: 'locations/{locationID}',
          }
        }
      ]
    },
    locationHelp: {
      handler: './src/handler/locationHelp.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'locations/help',
          }
        }
      ]
    },
    addSpaceship: {
      handler: './src/handler/addSpaceship.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'spaceships/{spaceshipID}',
          }
        }
      ]
    },
    updateSpaceshipStatus: {
      handler: './src/handler/updateSpaceshipStatus.handler',
      events: [
        {
          http: {
            method: 'put',
            path: 'spaceships/status/{spaceshipID}',
          }
        }
      ]
    },
    removeSpaceship: {
      handler: './src/handler/removeSpaceship.handler',
      events: [
        {
          http: {
            method: 'delete',
            path: 'spaceships/{spaceshipID}',
          }
        }
      ]
    },
    spaceshipHelp: {
      handler: './src/handler/spaceshipHelp.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'spaceships/help',
          }
        }
      ]
    },
    spaceshipTravelTo: {
      handler: './src/handler/spaceshipTravelTo.handler',
      events: [
        {
          http: {
            method: 'put',
            path: 'travel',
          }
        }
      ]
    },
    travelHelp: {
      handler: './src/handler/travelHelp.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'travel/help',
          }
        }
      ]
    },
  }
}

module.exports = serverlessConfiguration;
