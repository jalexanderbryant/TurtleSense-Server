var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  deviceName:{
    type: String,
    unique: true,
    required: true
  },

  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
});

DeviceSchema.methods = {
  toJson: function() {
    var obj = this.toObject()
    return obj;
  }
};

module.exports = mongoose.model('device', DeviceSchema);