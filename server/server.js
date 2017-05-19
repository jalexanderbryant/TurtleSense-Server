/*
  * DESC: 
*/
// Get the express module
var express   = require('express');

// instantiate the app
var app       = express();

// Get the api module (api/index.js)
var api       = require('./api/api')

// setup the app middleware by passing the newly created
// app to the appMiddleware module.
require('./middleware/appMiddleware')(app);

// Need to setup some global error handling here...
// Moved to the middleware stack

// setup the api
app.use('/api/', api);
console.log('inside server/server.js');

// export the app instance so it can be passed to other modules
module.exports = app
