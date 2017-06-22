var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  deviceName:{
    type: String,
    unique: true,
    required: true
  },
  deviceID: {
    type: String,
    unique: true,
    required: true
  },
});

module.exports = mongoose.model('device', DeviceSchema);