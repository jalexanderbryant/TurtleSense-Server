/*
  * DESC: Server entry point for TurtleSense
*/
// Require config module (config/config.js)
var config  = require('./server/config/config');

// Require app module (server/index.js)
var app     = require('./server/server');

// Require logger module (server/util/logger.js)
var logger  = require('./server/util/logger');

// Listen
app.listen( config.port );
logger.log('Server listening on http://localhost:' + config.port);