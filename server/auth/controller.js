var User = require('../api/user/userModel');
var config = require('../config/config');
var signToken = require('./auth').signToken;
var jwt = require('jsonwebtoken');
var logger = require('../util/logger');
var app = require('../server');
logger.log('authController');

exports.signin = function(request, result) {
  console.log('inside /auth/controller')
  console.log('request before signing: ' + JSON.stringify(request.body, null,4 ))
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  console.log('user_on_request: ' + request.user._id)
  data = {
    username: request.user.username,
    id: request.user._id
  }
  // var token = signToken(request.user._id);
  // var res = {token: token};

  var token = signToken(data);


  console.log('token after signing: ' + token)

  result.json({token: token});
};


/* New Authentication method */
exports.authenticate = function(request, result){
  logger.log('authMethod')
  var username = request.body.username;
  var password = request.body.password;

  if(!username || !password){
    return result.json({success: false, message: 'Authentication failed. Username and password required.'});
  }

  // retreive user
  User.findOne({username: username}, function(error, user){
    if(error){
      logger.error(error);
      next(error);
    } 

    if(!user){
      logger.log("authenticate issue=no user found")
      return result.json({success: false, message: "Authentication failed. User not found."});
    } else if(user){

      // Check user passwords...
      if(user.authenticate(password)){
        // Username and password correct
        var new_token = jwt.sign(user, request.app.get('tokenSecret'), {
          // Seconds
          expiresIn: config.expireTime
        });

        // return new token
        return result.json({
          success: true,
          message: 'Successfully created the token.',
          token: new_token
        });

      } else {
        // Failed
        return result.json({success: false, message: "Authentication failed. Incorrect password."});
      }
    }
  });
};