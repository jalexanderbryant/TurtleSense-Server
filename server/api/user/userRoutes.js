var router = require('express').Router();
var logger = require('../../util/logger');

console.log('inside server/api/user/userRoutes.js');
// Setup a test route
// The root of users can be found at localhost:3000/api/users
router.route('/')
  .get(function(request, response){
    
    logger.log('Hey! From user/');
    response.send({ok: true});
  });

module.exports = router;