const Device = require('./deviceModel');
const logger = require('../../util/logger');
const CircularJSON = require('circular-json');
const AWS = require('aws-sdk');

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

exports.create_device = function(request, result, next){
  var device_name = request.body.deviceName
  var serial_number = request.body.serialNumber
  var serial_number_error = "This device is already assocated with the database. Check the messaging service. Or Delete the device online"
  var device_name_error = "This device is already assocated with the database. Select a unique device name."
  

  logger.log('Attempting to create device with deviceName='+device_name +' and serial='+serial_number);
  console.log('Attempting to create device with deviceName='+device_name +' and serial='+serial_number);
  
  
  if(!device_name || !serial_number){
    logger.log('Failed to create device. Serial number or device name incorrect.')
    
    // Return an error to the device informing there was an error.
    // On edison, device serial number can be found in /factory/serial_number
    var error_payload = {
      status: "error",
      message: "Device name and serial number required. Verify that the device name you supplied is unique, and that the device serial number can be found in /factory/serial_number."
    };
    return result.send(JSON.stringify(error_payload));
  }

  // Check database to see if device of same name exists...
  // var existing_device = Device.findOne({deviceName: device_name});
  // logger.log('debug existing_device = ' + CircularJSON.stringify(existing_device));

  Device.findOne({serialNumber: serial_number}, function(error, device){
    if(error){ 
      logger.error(error.stack);
      return result.status(500).send('Something went wrong.');
    }

    if(device){
      logger.log('Device already exists with serial number provided.');
      return result.status(401).send({status: "error", message: serial_number_error});
    }

    Device.findOne({deviceName: device_name}, function(i_error, i_device){
      if(i_error){
        logger.error(error.stack);
        return result.status(500).send('Something went wrong.');
      }

      if(i_device){
        logger.log('Device already exists with the name provided.');
        return result.status(401).send({status: "error", message: device_name_error});   
      } else {

        // Create the device
        var iot = new AWS.Iot({apiVersion: '2015-05-28', region: 'us-west-2'});
        var iot_endpoint = null;

        iot.describeEndpoint({}, function(err,data){
          if(err) logger.log('action=create_device endpoint_error: ' + err );
          else{
            console.log('create_device iotdata: ' + data.endpointAddress);
            iot_endpoint = data.endpointAddress;
          }
        });

        var device_params = {
          thingName: device_name,
          thingTypeName: 'EdisonDevice',
          attributePayload: {
            attributes:{
              'deviceName': device_name,
              'serialNumber': serial_number
            }
          }
        };

        iot.createThing(device_params, function(err, device_data){
          if(err) logger.log('action=create_device createThing_error: ' + err);
          else {
            console.log('create_device createThing data: ' + JSON.stringify(device_data, null, 4));
 
            // Device now exists on AWS. Need to save it to the TurtleSense database
            var new_device = new Device(request.body);
            new_device.save(function(save_error, saved_device){
              
              if(save_error){
                logger.log('action=create_device createThing save error: '+save_error);
                return result.send({message: "Error saving the newly created device."});
              } else {
                // Device now exists in the turtlesense database
                // Need to create certifications and send them back to the device

                var cert_params = {
                  setAsActive: true
                }

                iot.createKeysAndCertificate(cert_params, function(cert_error, cert_data){
                  if(cert_error){
                    logger.log('action=create_device createKeysAndCertificate error: ' + cert_error);
                  } else {
                    console.log('action=create_device createKeysAndCertificate data: ' + JSON.stringify(cert_data,null,4));

                    // Certificates created. Attach a policy to it.
                    params={
                      policyName: 'EdisonHubPolicy',
                      principal: cert_data.certificateArn
                    }
                    iot.attachPrincipalPolicy(params, function(policy_err, policy_data){
                      if(err) logger.log('action=create_device attachPrincipalPolicy error: ' + policy_err);
                      else {
                        console.log('action=create_device attachPrincipalPolicy: '+ JSON.stringify(policy_data,null,4));

                        // Attach certificate to thing...
                        params={
                          principal: cert_data.certificateArn,
                          thingName: device_data.thingName
                        }

                        iot.attachThingPrincipal(params,function(thing_error, thing_data){
                          if(err) logger.log('action=create_device attachThingPrincipal error: ' + thing_error);
                          else{

                            // Return keys and certficiates
                            keys_and_certs = {
                              certificate_arn: cert_data.certificateArn,
                              certificate_pem: cert_data.certificatePem,
                              public_key: cert_data.keyPair.PublicKey,
                              private_key: cert_data.keyPair.PrivateKey
                            }

                            final_result = { message: "success", certs: keys_and_certs}
                            // return result.send({message: "Hello World"});
                            return result.send( final_result );
                          }


                        });

                      }
                    });
                  }
                });
              }
            })
          }

        });

        // return result.send({message: "Hello World"});
      }
    });

  });

}