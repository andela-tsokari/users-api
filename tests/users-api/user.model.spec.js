var userModel = require('./../../app/models/user.model');
var dbConfig = require('./../../config/db-config');
var knex = require('knex')(dbConfig.db[process.env.NODE_ENV]);

var user, user1, user2, users;

describe('User API unit tests: ', function () {
  // body...

  describe('Save a new user - ', function(){
    beforeEach(function (done) {
      // body...
      user = userModel.forge({
        first_name: 'papandrea',
        last_name: 'roberto',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      done();
    });


    it('should save without problems', function (done) {
      // body...          
      user.save()
        .then(function (user) {
          // body...
          expect(user.attributes)
            .toEqual(jasmine.objectContaining({
              "username": "modeerf",
              "password": "gobbledeedock"
            }));
          done();
        });
    });

    afterEach(function (done) {
      knex('users').where('username', 'modeerf').del()
        .then(function () {
          // body...
          done();
        });
    });
  });

  describe('Find a user from the user table - ', function () {
    // body...
    beforeEach(function (done) {
      // body...
      user = userModel.forge({
        first_name: 'papandrea',
        last_name: 'roberto',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      user.save()
        .then(function() {
          done();
        });
    });

    it('should return saved user', function(done) {
      user.fetch()
        .then(function(user) {
          console.log(user.get('first_name'));
          expect(user.attributes).toEqual(jasmine.objectContaining({
            first_name: 'papandrea',
            last_name: 'roberto',
            email: 'r2p2@jk.com',
            username: 'modeerf',
            password: 'gobbledeedock'
          }));
          done();          
        });
    });

    afterEach(function (done) {
      knex('users').where('username', 'modeerf').del()
        .then(function(){
          done();
        });
    });

  });

  describe('Find a number of users: ', function() {
    beforeEach(function(done) {
      user1 = userModel.forge({
        first_name: 'mohini',
        last_name: 'ufeli',
        email: 'mo@ufeli.ng',
        username: 'mohini',
        password: '1434'
      });

      user2 = userModel.forge({
        first_name: 'susan',
        last_name: 'hastings',
        email: 'sue@andela.co',
        username: 'sue',
        password: 'wo1232'
      })

      user1.save()
        .then(function(){
        });

      user2.save()
        .then(function(){
          done();
        });

    });

    it('it should fetch all users - ', function(done) {
      userModel.fetchAll({require: true})
        .then(function(users) {
          console.log(users.models);
          expect(users).toBeDefined();
          done();
        });

    });

    afterEach(function (done) {
      // body...
      knex('users').where('admin', false).del()
        .then(function () {
          // body...
          done();
        });
    });
  });

});
