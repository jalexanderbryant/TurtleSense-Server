var User = require('./userModel');
var _ = require('lodash');

console.log('inside api/user/userController');

// Find single user by id???
exports.params = function( request, result, next, id ){
    User.findById(id)
        .then(function(user){
            if(!user){
                next(new Error("No user with that id"));
            } else {
                request.user = user;
                next();
            }
        }, function(err){ next(err);});
};


// Get all users
exports.get = function(request, result, next)
{
    console.log('inside userController.GET');
    User.find()
        .then(function(users){
            result.json(users);
        }, function(err){
            next(err);
        });
};

exports.getOne = function(request, result, next)
{
    var user = request.user;
    result.json(user);
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
            result.json(saved);
        }
    })
};

// Create a new user
exports.post = function(request, result, next)
{
    console.log('inside userController.POST');
    var newUser = request.body;

    console.log('userController.POST - ' + newUser.toString());
    User.create(newUser)
        .then(function(user){
            result.json(user);
        }, function(err){
            next(err);
        });
};

// Delete a user
exports.delete = function(request, result, next)
{
    request.user.remove(function(err, removed){
        if(err){
            next(err);
        } else {
            result.json(removed);
        }
    });
};