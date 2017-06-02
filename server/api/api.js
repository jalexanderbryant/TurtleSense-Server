var router = require('express').Router();

console.log('inside server/api/api.js');
// api router will mount the other routes
// for all of our resources (users, hubs, etc)
router.use('/users', require('./user/userRoutes'));
// router.use('/devices', require('./device/deviceRoutes'));

module.exports = router;