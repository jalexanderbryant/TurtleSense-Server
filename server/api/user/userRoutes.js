var router = require('express').Router();
var logger = require('../../util/logger');
var userController = require('./userController'); 

console.log('inside server/api/user/userRoutes.js');

// Create generic routes for user
require('../../util/createGenericRoutes')(userController, router);
// Setup a test route
// The root of users can be found at localhost:3000/api/users
// router.route('/testA')
//   .get(function(request, response){
    
//     logger.log('Hey! From user/');
//     response.send({ok: true});
//   });


module.exports = router;