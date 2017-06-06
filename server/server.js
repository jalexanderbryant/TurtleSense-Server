/*
  * DESC: 
*/
// Get the express module
const express   = require('express');

// instantiate the app
const app       = express();

// Get the api module (api/index.js)
const api       = require('./api/api')

// Get the application configurations
const config = require('./config/config');

// load logger
const logger = require('./util/logger');

// Load auth routes
const auth = require('./auth/routes');

// Path
const path = require('path');


// Setup database
require('mongoose').connect(config.db.url);


if(config.seed){
  require('./util/seed');
}

// setup the app middleware by passing the newly created
// app to the appMiddleware module.
require('./middleware/appMiddleware')(app);

// Need to setup some global error handling here...
// Moved to the middleware stack

// setup the api
app.use('/api/', api);
app.use('/auth', auth);
console.log('debug123: ' + __dirname);
console.log('inside server/server.js');

app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app instance so it can be passed to other modules
module.exports = app
