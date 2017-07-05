// var router = require('express').Router();
// var authController = require('./controller');
// var verifyUser = require('./auth').verifyUser
// var logger = require('../../util/logger');

// Check to see if uname & pword match whats
// stored in database before returning a JWT
// router.post('/signin', verifyUser(), authController.signin);

var router = require('express').Router();
var authController = require('./controller');
var logger = require('../util/logger');

logger.log('authroutes');
router.post('/authenticate', authController.authenticate);


module.exports = router;