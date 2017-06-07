var User = require('./userModel');
var Auth = require('../../auth/auth')
var _ = require('lodash');

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
        var token = Auth.signToken(user._id);
        result.json({token: token})
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