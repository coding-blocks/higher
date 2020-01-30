'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    'ember-composable-helpers': {
      only: ['inc', 'dec', 'range'],
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('node_modules/@coding-blocks/motley/dist/hiringblocks/app.min.css')
  app.import('node_modules/@coding-blocks/motley/dist/hb/app.min.css')
  app.import('node_modules/pikaday/css/pikaday.css')
  app.import('node_modules/jspdf/dist/jspdf.min.js', {
    using: [
      { transformation: 'cjs', as: 'jspdf' }
    ]
  })
  app.import('node_modules/html2canvas/dist/html2canvas.min.js', {
    using: [
      { transformation: 'cjs', as: 'html2canvas' }
    ]
  })

  return app.toTree();
};
