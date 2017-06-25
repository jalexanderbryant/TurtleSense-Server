var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./deviceController');

router.param('id', controller.params);

console.log('inside server/api/device/deviceRoutes.js');

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

router.post('/create_device', controller.create_device);
// Setup a test route
// The root of users can be found at localhost:3000/api/users
// router.route('/')
//   .get(function(request, response){
//     logger.log('Hey! From device/');
//     response.send({ok: true});
//   });

module.exports = router;