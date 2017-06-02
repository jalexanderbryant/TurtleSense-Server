module.exports = function(controller, router){
  console.log('inside util/createGenericRoutes');
  router.param('id', controller.params);

  router.route('/')
    .get(controller.get)
    .post(controller.post);

  router
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);
};