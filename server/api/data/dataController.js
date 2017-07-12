var Data = require('./dataModel');
var config = require('../../config/config');
const logger = require('../../util/logger');
var fs = require('fs');
var readline = require('readline');

exports.get = function( request, result, next)
{
  Data.find({})
    .then(function(all_data){
      result.json(all_data);
    }, function(error){
      next(err);
    });
}

exports.upload = function(request, result, next)
{
    logger.log("dataController request.body =" + JSON.stringify(request.body,null,4));
    logger.log("dataController request.file =" + JSON.stringify(request.file,null,4));

    if(request.file == undefined)
    {
      return result.json({success:false, message: "Data upload failed. A file with contents is required"});
    }

    var nugget = {
      motion: {}
    };

    var file_interface = readline.createInterface({
      input: fs.createReadStream(request.file.path)
    });
    logger.log('dataController upload lines')
    file_interface.on('line', function(line){    
      values = line.split(',')
      
      // Serial number
      nugget.deviceSerial = values[0].trim();

      // Time
      time_string = values[1].trim();
      nugget.dateAndTime = new Date( time_string );

      nugget.key = nugget.deviceSerial + "" + time_string

      // Temperature
      temp_string = values[2].trim();
      nugget.temperature = parseFloat( temp_string );

      // moisture
      moisture_string = values[3].trim();
      nugget.moisture = parseFloat( moisture_string );

      // Motion
      motion_x = values[4].trim();
      nugget.motion.x_acc = parseFloat(motion_x);

      motion_y = values[5].trim();
      nugget.motion.y_acc = parseFloat(motion_y);

      motion_z = values[6].trim();
      nugget.motion.z_acc = parseFloat(motion_z);


      // Write to DB
      var new_data_nugget = new Data(nugget);

      logger.log('new_data_nugget: ' + JSON.stringify(new_data_nugget, null, 4));

      new_data_nugget.save(function(error, data_nugget){
        if(error)
        {
          return next(error);
        }
      });
    });

    return result.json({success: true, message: 'Uploaded'})
}

exports.getTemp = function(request, result, next)
{
  Data.find({})
    .select('temperature dateAndTime -_id')
    .then(function(all_data){
      result.json(all_data);
    }, function(error){
      next(err);
    });
}

exports.getMoisture = function(request, result, next)
{
  Data.find({})
    .select('moisture dateAndTime -_id')
    .then(function(all_data){
      result.json(all_data);
    }, function(error){
      next(err);
    });
}

exports.getMotion = function(request, result, next)
{
  Data.find({})
    .select('motion dateAndTime -_id')
    .then(function(all_data){
      result.json(all_data);
    }, function(error){
      next(err);
    });
}