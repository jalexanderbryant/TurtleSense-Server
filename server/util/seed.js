var User = require('../api/user/userModel');
var Device = require('../api/device/deviceModel')
var _ = require('lodash');
var logger = require('./logger');
logger.log('Seeding the Database');

var users = [
  { 
    username: 'alpha',
    password: 'letmein',
    devices: [],
    email: 'alpha@gmail.com'
    // devices: ['a894b1f4-9f87-48e1-ae2e-8992ea0e7baa',
    //           '6df1d7bb-f904-47ad-9313-37056cb3fb4a']
  },
  
  { 
    username: 'bravo', 
    password: 'letmein',
    devices: [],
    email: 'bravo@gmail.com'
    // devices: ['891c2557-84c7-4731-876b-dc8283081a7c']
  },
  
  {
    username: 'charlie',
    password: 'letmein',
    devices: [],
    email: 'charlie@gmail.com'
    // devices: ['6be646b6-2f80-4e89-b1c7-73936c6e5ed2',
    //           'a894b1f4-9f87-48e1-ae2e-8992ea0e7baa',
    //           '6df1d7bb-f904-47ad-9313-37056cb3fb4a']
  }
];

var devices = [
  {deviceID: 'a894b1f4-9f87-48e1-ae2e-8992ea0e7baa'},
  {deviceID: '6df1d7bb-f904-47ad-9313-37056cb3fb4a'},
  {deviceID: '6be646b6-2f80-4e89-b1c7-73936c6e5ed2'},
  {deviceID: '891c2557-84c7-4731-876b-dc8283081a7c'},
  {deviceID: 'ecc4018c-49ca-11e7-a919-92ebcb67fe33'},
  {deviceID: 'f8abc21e-49ca-11e7-a919-92ebcb67fe33'},
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User,Device]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}


var createDevices = function(data) {
  var promises = devices.map(function(device) {
    return createDoc(Device, device);
  });

  return Promise.all(promises)
    .then(function(devices) {
      return _.merge({devices: devices}, data || {});
    });
};

var createUsers = function(data) {
  var newUsers = users.map(function(user) {
    for( var i = 0; i < 3; i++){
      var tmp = data.devices[Math.floor(Math.random()*devices.length)]._id;
      user.devices.push(tmp)
    }
    console.log(user.devices)
    return createDoc(User, user);
  });

  return Promise.all(newUsers)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

cleanDB()
  .then(createDevices)
  .then(createUsers)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
