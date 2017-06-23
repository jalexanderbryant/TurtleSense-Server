const Device = require('./deviceModel');
const logger = require('../../util/logger');
const CircularJSON = require('circular-json');

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

exports.check_devices = function(request, result, next){
  var device_name = request.body.device_name
  var serial_number = request.body.serial_number
  var serial_number_error = "This device is already assocated with the database. Check the messaging service. Or Delete the device online"
  var device_name_error = "This device is already assocated with the database. Select a unique device name."
  

  logger.log('Attempting to create device with deviceName='+device_name +' and serial='+serial_number);
  
  
  if(!device_name || !serial_number){
    logger.log('Failed to create device. Serial number or device name incorrect.')
    
    // Return an error to the device informing there was an error.
    // On edison, device serial number can be found in /factory/serial_number
    var error_payload = {
      status: "error",
      message: "Device name and serial number required. Verify that the device name you supplied is unique, and that the device serial number can be found in /factory/serial_number."
    };
    result.send(JSON.stringify(error_payload));
  }

  // Check database to see if device of same name exists...
  // var existing_device = Device.findOne({deviceName: device_name});
  // logger.log('debug existing_device = ' + CircularJSON.stringify(existing_device));

  Device.findOne({deviceName: device_name})
    .then( function(device){
      if(error){ 
        logger.error(error.stack);
        return result.status(500).send('Something went wrong.');
      }

      if(device){
        logger.log('Device already exists with device name provided.');
        return result.status(401).send({status: "error", message: device_name_error});
      }
    }, function(err){next(err)})
    
    .then(function(device){
      
    }, function(err){next(err)});

  // Device.findOne({serialNumber: serial_number}, function(error, device){
  //   if(error){ 
  //     logger.error(error.stack);
  //     return result.status(500).send('Something went wrong.');
  //   }

  //   if(device){
  //     logger.log('Device already exists with serial number provided.');
  //     return result.status(401).send({status: "error", message: device_name_error});
  //   }
  // });

  console.log('end?')
  // next(result.send("abc"));

}


exports.create_device = function(error, request, response){
  response.send("Device Created");
}