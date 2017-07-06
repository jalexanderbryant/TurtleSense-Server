const aws_module = require('aws-sdk');
/*
* DESC: Primary configuration entry point for TurtleSense
*/

// Require lodash module
var _ = require('lodash');

var aws_creds = new aws_module.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAIPZICFHYXCTXE4IQ',
  secretAccessKey: process.env.AWS_SECRET_KEY || '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',
  sessionToken: null
});

aws_module.config.credentials = aws_creds


// Setup a config object
var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  // 90 days in seconds
  expireTime: 24 * 60 * 60 * 90,
  secrets:{
    jwt: process.env.JWT || 'gumball'
  },
  email:{
    // Change before production
    user: process.env.TS_EMAIL_USER,
    password: process.env.TS_EMAIL_PASSWORD,
    registerUserUrl: 'api/users/verifyEmail'
  },
  server: {
    host: process.env.TS_URL || 'localhost',
    port: process.env.PORT || 3000,
  },
  aws_region: 'us-west-2',
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID || 'AKIAIPZICFHYXCTXE4IQ',
  aws_secret_key: process.env.AWS_SECRET_KEY || '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',
  AWS: aws_module
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