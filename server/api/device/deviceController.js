var Device = require('./deviceModel');

exports.params = function( request, result, next, id ){
  Device.findById(id)
    .then(function(device){
      if(!category){
        next(new Error('No device with that id'));
      } else {
        request.device = device;
        next();
      }
    }, function(err){
      nex(err);
    });
};

exports.get = function(request, result, next) {
  Device.find({})
    .then(function(devices){
      result.json(devices);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(request, result, next) {
  var device = request.device;
  result.json(device);
};

exports.put = function(request, result, next) {
  var device = request.category;

  var update = request.body;

  _.merge(device, update);

  device.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      result.json(saved);
    }
  })
};

exports.post = function(request, request, next) {
  var newDevice = request.body;

  Device.create(newDevice)
    .then(function(category) {
      result.json(device);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(request, result, next) {
  request.device.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      result.json(removed);
    }
  });
};