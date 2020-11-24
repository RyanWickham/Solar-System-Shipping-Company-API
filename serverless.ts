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
            path: 'location',
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
            path: 'location/help',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
