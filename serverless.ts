import {  } from '@functions/server' 

const serverlessConfiguration = {
  service: 'sala-de-aula',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-google-cloudfunctions', 'serverless-webpack'],
  provider: {
    name: 'google',
    runtime: 'nodejs14',
    region: 'europe-west1',
    project: 'serveless-test-382918',
  },
};

module.exports = serverlessConfiguration;
