var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

var router = express.Router();

app
  .use(bodyParser.json()),
  .use(bodyParser.urlencoded({extended: true})),
  .use('/api/v1', router);
var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var router = express.Router();

app
  .use(bodyParser.json()),
  .use(bodyParser.urlencoded({extended: true}))
  .use('/', router);

app
  .listen(process.env.PORT, function(){
    console.log('Express App running on port: ' + process.env.PORT)
  });