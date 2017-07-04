const morgan     = require('morgan');
const bodyParser = require('body-parser');
const err = require('./err');

// Setup global middleware here
module.exports = function(app){
  app.use(err());
  app.use(morgan('dev')); // ???
  app.use(bodyParser.urlencoded({ extended: true })); //???
  app.use(bodyParser.json()); // ???
  
  // We need this for Cross Orgin Request Sharing
  // Allow requests from anywhere
  app.use(function(request, result, next){
    result.setHeader('Access-Control-Allow-Origin', '*');
    result.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  }) 

};