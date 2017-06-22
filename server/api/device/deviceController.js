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
  var serial_number_error = "This device is already associated assocated with the database. Check the messaging service. Or Delete the device online"
  var device_name_error = "This device is already associated assocated with the database. Select a unique username"
  if(!device_name || !serial_number)
  {
    // Return an error to the device informing there was an error.
    // On edison, device serial number can be found in /factory/serial_number
    var error_payload = {
      status: "error",
      message: "Device name and serial number required. Verify that the device name you supplied is unique, and that the device serial number can be found in /factory/serial_number."
    };
    result.json(error_payload);
  }

  // Check database
  if( check_db(serial_number, "serial_number") )
    result.json({status: "error", message: serial_number_error});

  if(check_db(device_name, "device_name"))
    result.json({status: "error", message: device_name_error})

  result.json({ message: "Hello,world"});
}

// Returns true of false depending on whether a user is found
// or not.
function check_db(parameter, parameter_type)
{
  var query = null;
  
  if (parameter_type == "serial_number"){
    query = {deviceID: parameter};
  } else if(parameter_type == "device_name"){
    query = {deviceName: parameter};
  }

  Device.find(query)
    .then(function(device){
      if(user){
        return true;
      } else {
        return false;
      }
    });
}