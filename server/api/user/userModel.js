var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
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

// middleware that will run before a document
// is created
userSchema.pre('save', function(next) {

  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
})


userSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  }
};

module.exports = mongoose.model('user', userSchema);


module.exports = mongoose.model('user', userSchema);

  // List of ids corresponding each device
  // a user is associated with
  // devices: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'device'
  // }]