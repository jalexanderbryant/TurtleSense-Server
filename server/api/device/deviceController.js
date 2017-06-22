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

exports.create_device = function(request, result, next)
{
  var device_name = request.body.device_name
  var serial_number = request.body.serial_number

  if(!device_name || !serial_number)
  {
    // Return an error to the device informing there was an error.
    // On edison, device serial number can be found in /factory/serial_number
    var error_payload = {
      status: "error",
      message: "Device name and serial number required. Verify that the device name you supplied is unique, and that the device serial number can be found (/factory/serial_number)."
    };
    result.json(error_payload);
  }

  // Check database for 
  Device.find({deviceID: device_name})
    .then(function(device){
      if(user){
        var error_payload = {
          status: "error",
          message: "This device is already associated assocated with the database. Check the messaging service."
        };

        result.json(error_payload);
      }
    });

  Device.find({deviceName: serial_number})
    .then(function(device){
      if(user){
        var error_payload = {
          status: "error",
          message: "This device is already associated assocated with the database. Check the messaging service."
        };

        result.json(error_payload);
      }
    });


  result.json({ message: "Hello,world"});
}

// Returns true of false depending on whether a user is found
// or not.
function check_db(parameter, parameter_type)
{
  var query = null;
  message = null;
  
  if (parameter_type == "serial_number"){
    query = {deviceID: parameter};
    message = "This device is already associated assocated with the database. Check the messaging service."
  } else {
    query = {deviceName: parameter};
    message = "This device is already associated assocated with the database. Select a unique username."
  }

  Device.find(query)
    .then(function(device){
      if(user){
        var error_payload = {
          status: "error",
          message: "This device is already associated assocated with the database. Check the messaging service."
        };

        result.json(error_payload);
      }
    });
}