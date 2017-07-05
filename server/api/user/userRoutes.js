var router = require('express').Router();
var logger = require('../../util/logger');
var userController = require('./userController');
var auth = require('../../auth/auth');

// var checkUserAuthentication = [Auth.decodeToken(), Auth.getFreshUser()]; 

// Create generic routes for user
// require('../../util/createGenericRoutes')(userController, router);
router.param('id', userController.params);

/* Routes unrolled to test authentication...*/
router.get('/', auth.verifyToken(), userController.get);



router.get('/me', userController.me);
router.get('/verifyEmail/:authToken', userController.completeRegistration);
router.get('/:id', userController.getOne);

router.post('/', userController.post);

router.put('/:id/adddevicetouser', userController.add_device_to_user);
router.put('/:id', userController.put);

router.delete('/:id', userController.delete);


// router.route('/')
//   .get(userController.get)
//   .post(userController.post);

// router.route('/:id')
//   .get(userController.getOne)
//   .put(userController.put)
//   .delete(userController.delete);



// Setup a test route
// The root of users can be found at localhost:3000/api/users
// router.route('/testA')
//   .get(function(request, response){
    
//     logger.log('Hey! From user/');
//     response.send({ok: true});
//   });


module.exports = router;