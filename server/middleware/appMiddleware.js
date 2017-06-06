const morgan     = require('morgan');
const bodyParser = require('body-parser');
const err = require('./err');

// Setup global middleware here
module.exports = function(app){
  app.use(err());
  app.use(morgan('dev')); // ???
  app.use(bodyParser.urlencoded({ extended: true })); //???
  app.use(bodyParser.json()); // ???

  

};