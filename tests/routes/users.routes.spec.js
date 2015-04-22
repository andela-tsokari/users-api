var request = require('supertest');
var user = require('./../../app/models/user.model')[0],
    users = require('./../../app/models/user.model')[1];
var app = require('./../../config/app-config');