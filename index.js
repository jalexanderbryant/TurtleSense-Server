/*
  * DESC: Server entry point for TurtleSense
*/
const path = require('path');
const express = require('express');
const logger  = require('./server/util/logger');
const config  = require('./server/config/config');
const app     = require('./server/server');
const ejs     = require('ejs');

// Setup up templating/view engine
app.set('views', path.join(__dirname, 'client', 'views'));
app.set('view engine', 'ejs');

// Set path for static files
app.use(express.static(__dirname + '/client'))

// Manage frontend routing by directing all angular requests here...
app.use('/', function(request, result){
  result.render('index', {
    title: "TurtleSense Server"
  });
});


// Tests....
console.log("debug123 " + config.server.host);
console.log("debug123 " + config.server.port);
// Listen
app.listen( config.server.port );
logger.log('Server listening on http://' + config.server.host + ':' + config.server.port);