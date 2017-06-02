var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  deviceID: {
    type: String,
    unique: true,
    required: true
  },
});
// var userSchema = new Schema({
//   username: {
//     type: String,
//     unique: true,
//     requried: true
//   },

//   firstname: {
//     type: String,
//     unique: false,
//     required: true
//   },
//   lastname: {
//     type: String,
//     unique: false,
//     required: true
//   }

//   // mobile number - not required
//   mobile: String,

//   // List of ids corresponding each device
//   // a user is associated with
//   devices: [],
  
//   // Differentiate between types of users
//   // type: {
//   //   type: String
//   // }
// });