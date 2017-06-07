const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: config.email.user,
    pass: config.email.pass
  }
});

exports.sendRegistrationEmail = function(user, token)
{
  var link = "http://"+ config.server.host+":"+config.server.port+"/"
}