'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'hiring-front',
    podModulePrefix: 'hiring-front/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-simple-auth-token': {
      identificationField: 'code',
      passwordField: 'code',
      tokenPropertyName: 'jwt',
      refreshAccessTokens: true,
      tokenExpireName: 'exp',
      refreshLeeway: 60, //send a request for refresh_token 60sec before actual expiration
      refreshTokenPropertyName: 'refresh_token',
      authorizationHeaderName: 'Authorization',
      authorizationPrefix: 'JWT ',
    },
    'simple-auth': {
      crossOriginWhitelist: ['*']
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    SCATTERSHOT_API_HOST: 'https://app.codingblocks.com'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.API_HOST = 'http://localhost:3003'
    ENV.PUBLIC_URL = 'http://localhost:4200/'
    ENV.CLIENT_ID = 8986717992
    ENV.ONEAUTH_URL = 'https://account.codingblocks.com'
    ENV.HACKER_BLOCKS_PUBLIC_URL = 'http://test.hackerblocks'
    ENV.SCATTERSHOT_API_HOST = 'https://app.codingblocks.com'
  }

  if (environment === 'staging') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.API_HOST = 'https://hire-api.codingblocks.xyz'
    ENV.PUBLIC_URL = 'https://hire.codingblocks.xyz/'
    ENV.CLIENT_ID = 4190457915
    ENV.ONEAUTH_URL = 'https://account.codingblocks.com'
    ENV.HACKER_BLOCKS_PUBLIC_URL = 'https://hack.codingblocks.com'
    ENV.SCATTERSHOT_API_HOST = 'https://app.codingblocks.com'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.API_HOST = 'https://hire-api.codingblocks.com'
    ENV.PUBLIC_URL = 'https://hire.codingblocks.com/'
    ENV.CLIENT_ID = 4190457915
    ENV.ONEAUTH_URL = 'https://account.codingblocks.com'
    ENV.HACKER_BLOCKS_PUBLIC_URL = 'https://hack.codingblocks.com'
    ENV.SCATTERSHOT_API_HOST = 'https://app.codingblocks.com'
  }

  ENV['ember-simple-auth-token'].serverTokenEndpoint = `${ENV.API_HOST}/login`
  ENV['ember-simple-auth-token'].serverTokenRefreshEndpoint = `${ENV.API_HOST}/refresh-token?client=web`

  return ENV;
};
