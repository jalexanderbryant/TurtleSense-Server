var mongoose = require('mongoose');
var schema = mongoose.Schema;

var data_schema = new schema({
    deviceSerial: {
      type: String,
      default: null
    },

    //key =  SerialNumber:Time - We'll use this later to check if 
    key: {
      type: String,
      required: true
    },

    dateAndTime: {
      type: Date,
      default: null
    },

    temperature: {
      type: Number,
      default: null
    },

    moisture: {
      type: Number,
      default: null
    },

    motion: {
      x_acc: { type: Number },
      y_acc: { type: Number },
      z_acc: { type: Number }
    },

});

data_schema.methods = {
  // Return json
  toJson: function(){
  var obj = this.toObject();
  return obj;
  }
};

data_schema.statics = {
  find_all_data_by_device: function(serial, callback){
    this.find({deviceSerial: serial}, callback);
  }
};

module.exports = mongoose.model('data', data_schema);