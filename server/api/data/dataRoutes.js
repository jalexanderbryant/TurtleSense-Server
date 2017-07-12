var router = require('express').Router();
var logger = require('../../util/logger');
var dataController = require('./dataController');
var multer = require('multer');
// var upload = multer({ dest: 'tmp/uploads/' });

var storage = multer.diskStorage({
  destination: function(request, file, cb){
    cb(null, 'tmp/uploads');
  },
  filename: function(request, file, cb){
    cb(null, file.fieldname + '_' + Date.now())
  }
});

var upload = multer({storage: storage})


// Test 
router.route('/').get(dataController.get);

router.route('/temperature').get(dataController.getTemp);
router.route('/moisture').get(dataController.getMoisture);
router.route('/motion').get(dataController.getMotion);

router.post('/:serial/upload', upload.single('data'), dataController.upload);

module.exports = router;