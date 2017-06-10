/*
  * DESC: Server entry point for TurtleSense
*/
const path = require('path');
const express = require('express');
const logger  = require('./server/util/logger');
const config  = require('./server/config/config');
const app     = require('./server/server');

// Direct to static files
app.use(express.static(path.join(__dirname, 'client/')));

// Tests....s
app.get('/signup', function(request, result){
  result.sendFile(path.resolve('client/signup.html'));
});
console.log("debug123 " + config.server.host);
console.log("debug123 " + config.server.port);
// Listen
app.listen( config.server.port );
logger.log('Server listening on http://' + config.server.host + ':' + config.server.port);