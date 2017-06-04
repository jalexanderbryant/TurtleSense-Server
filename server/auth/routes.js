var router = require('express').Router();
var authController = require('./controller');
var verifyUser = require('./auth').verifyUser

// Check to see if uname & pword match whats
// stored in database before returning a JWT
router.post('/signin', verifyUser(), authController.signin);

module.exports = router;