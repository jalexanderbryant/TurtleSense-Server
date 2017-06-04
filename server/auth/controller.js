var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;

exports.signin = function(request, result, next) {
  console.log('inside /auth/controller')
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(request.user._id);
  result.json({token: token});
};