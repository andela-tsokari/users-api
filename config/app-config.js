var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./../app/routes/users.route');
var cors = require('cors');
var corsConfig = {
  origin: 'http://user-subs.herokuapp.com'
};

module.exports = (function() {
  'use strict';
  var app = express();
  var router = express.Router(); 
  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(cors(corsConfig))
    .use('/api/v1', router);
  
  routes(router);

  return app;
})();