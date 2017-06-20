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
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'device'
  }],
  
  isVerified: false
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
  },
  
  toJson: function() {
    var obj = this.toObject()
    delete obj.password;
    return obj;
  }
};

userSchema.statics = {
  findUserByIdAndUserName: function(id, username, callback) {
        this.findOne({ username: username, _id: id }, callback);
  }
}

module.exports = mongoose.model('user', userSchema);