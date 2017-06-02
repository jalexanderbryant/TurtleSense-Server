var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    requried: true
  }
  // firstname: {
  //   type: String,
  //   unique: false,
  //   required: true
  // },
  // lastname: {
  //   type: String,
  //   unique: false,
  //   required: true
  // },

  // // mobile number - not required
  // mobile: String,


});
module.exports = mongoose.model('user', userSchema);

  // List of ids corresponding each device
  // a user is associated with
  // devices: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'device'
  // }],
  
  // Differentiate between types of users
  // type: {
  //   type: String
  // }