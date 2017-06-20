var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;

exports.signin = function(request, result, next) {
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