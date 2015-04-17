var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

var router = express.Router();

app
  .use(bodyParser.json()),
  .use(bodyParser.urlencoded({extended: true})),
  .use('/api/v1', router);
