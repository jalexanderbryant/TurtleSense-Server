var User = require('./userModel');
var config = require('../../config/config');
var Auth = require('../../auth/auth');
var jwt = require('jsonwebtoken');
var Mailer = require('../../mailers/mailers');
var _ = require('lodash');
const logger = require('../../util/logger');

console.log('inside api/user/userController');

// Find single user by id???
exports.params = function( request, result, next, id ){
    User.findById(id)
        .select('-password')
        .exec()
        .then(function(user){
            if(!user){
                next(new Error("No user with that id"));
            } else {
                request.user = user;
                next();
            }
        }, 
        function(err){
            next(err);
        });
};


// Get all users
exports.get = function(request, result, next)
{
    console.log('inside userController.GET');
    User.find({})
        .select('-password')
        .then(function(users){
            result.json(users.map(function(user){
                return user.toJson();
            }));
        }, 
        function(err){
            next(err);
        });
};

exports.getOne = function(request, result, next)
{
    var user = request.user;
    result.json(user.toJson());
};

// Update a user
exports.put = function(request, result, next)
{
    var user = request.user;
    var update = request.body;
    _.merge(user,update);

    user.save(function(err, saved){
        if(err){
            next(err);
        } else {
            result.json(saved.toJson());
        }
    })
};

// Create a new user
exports.post = function(request, result, next)
{
    console.log('inside userController.POST');
    var newUser = new User(request.body);

    newUser.save(function(err, user){
        if(err){ 
            return next(err);
        }
        var tokenData = {
            username: user.username,
            id: user._id
        }

        // var token = Auth.signToken(user._id);
        var token = Auth.signToken(tokenData);
        
        Mailer.sendRegistrationEmail(user, token, function(error, res){
            if(error){ return next(err); }

            console.log('debug234 ' + result)
            result.json({
                message: "Registration Email Sent",
                result: res
            });
        })
        // result.json({token: token});
    });

    // console.log('userController.POST - ' + newUser.toString());
    // User.create(newUser)
    //     .then(function(user){
    //         result.json(user);
    //     }, function(err){
    //         next(err);
    //     });
};

// Delete a user
exports.delete = function(request, result, next)
{
    request.user.remove(function(err, removed){
        if(err){
            next(err);
        } else {
            result.json(removed.toJson());
        }
    });
};

exports.me = function( request, result){
    result.json(request.user.toJson());
}


exports.completeRegistration = function(request, result){
    console.log('debug345 ' + config.secrets);
    console.log('debug345 ' + config.secrets.jwt);
    jwt.verify(request.params.authToken, config.secrets.jwt, function(error, decodedToken){

        console.log('debug456 token='+ JSON.stringify(decodedToken, null, 4) );
        console.log('debug567 token_id='+decodedToken._id )
        console.log('debug567 token_from_body='+request.body.token )
        if(error){

            logger.error(error.stack);
            return result.status(500).send('Something went wrong with verifying you.');

        } else {
            
            User.findUserByIdAndUserName(decodedToken._id, decodedToken.username, function(error, user){
                if(error){
                    logger.error(error.stack);
                    return result.status(500).send('Something went wrong with locating you in the database.');

                } else if( user == null ) {

                    console.log('debug_decoded_token: ' + decodedToken._id);
                    console.log('debug_decoded_token_username: ' + decodedToken.username);

                    return result.status(422).send('Something went wrong. Your email is not reconized.');

                } else if( user.isVerified === true ){
                    return result.json({message: 'account is already verified'});

                } else {
                    user.isVerified = true;
                    user.save(function(err, saved){
                        if(err){
                            next(err);
                        } else {
                            result.json({
                                message: 'Registration Successful',
                                username: saved.username
                            });
                        }
                    })

                }
            })
        }
    })
};