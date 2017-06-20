var router = require('express').Router();
var logger = require('../../util/logger');
var userController = require('./userController');
var Auth = require('../../auth/auth');

var checkUserAuthentication = [Auth.decodeToken(), Auth.getFreshUser()]; 

console.log('inside server/api/user/userRoutes.js');

// Create generic routes for user
// require('../../util/createGenericRoutes')(userController, router);
router.param('id', userController.params);
router.get('/me', checkUserAuthentication, userController.me);

router.route('/')
  .get(checkUserAuthentication, userController.get)
  .post(userController.post);

router.route('/:id')
  .get(userController.getOne)
  .put(checkUserAuthentication, userController.put)
  .delete(checkUserAuthentication, userController.delete);

router.get('/verifyEmail/:authToken', userController.completeRegistration);

// Setup a test route
// The root of users can be found at localhost:3000/api/users
// router.route('/testA')
//   .get(function(request, response){
    
//     logger.log('Hey! From user/');
//     response.send({ok: true});
//   });


module.exports = router;