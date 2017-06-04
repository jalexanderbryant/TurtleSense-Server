/*
* DESC: Primary configuration entry point for TurtleSense
*/

// Require lodash module
var _ = require('lodash');

// Setup a config object
var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days in minutes
  expireTime: 24 * 60 * 60 * 10,
  secrets:{
    jwt: process.env.JWT || 'gumball'
  }
};

// Set NODE_ENV environment variable
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// Add NODE_ENV environment variable to config object
config.env = process.env.NODE_ENV;

var envConfig;

// Using the try/catch block because 'require' coulde error
// out if the file doesn't exist. Set the object's attributes if the file
// exists, otherwise, fallback to an empty object if there's an error
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

// merge the two config file together
// the envConfig file will overwrite properties
// on the config object
module.exports = _.merge(config, envConfig);