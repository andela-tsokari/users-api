var user = require('./../../app/models/user.model')[0],
    users = require('./../../app/models/user.model')[1];
var dbConfig = require('./../../config/db-config');
var knex = require('knex')(dbConfig.db[process.env.NODE_ENV]);

var testUser, testUsers;
describe('User API unit tests: ', function () {
  // body...

  describe('Save a new user - ', function(){
    beforeEach(function (done) {
      // body...
      testUser = user.forge({
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      done();
    });


    it('should save without problems', function (done) {
      // body...          
      testUser.save()
        .then(function (testUser) {
          // body...
          expect(testUser.attributes)
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
      testUser = user.forge({
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      testUser.save()
        .then(function() {
          done();
        });
    });

    it('should return saved user', function(done) {
      testUser.fetch()
        .then(function(testUser) {
          expect(testUser.attributes).toEqual(jasmine.objectContaining({
            first_name: 'port',
            last_name: 'harcourt',
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

  describe('find a user and update any details -  ', function() {
    beforeEach(function (done) {
      // body...
      testUser = user.forge({
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      testUser.save()
        .then(function() {
          done();
        });
    });

    it('should update the user details: ', function(done) {
      user
        .where({
          first_name: 'port'
        })
        .save({
          first_name: 'Las'
        }, 
        {
          method: 'update',
          patch: true
        })
        .then(function(user) {
          expect(user.toJSON()).toEqual(jasmine.objectContaining({first_name: 'Las'}));
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

  describe('find a user and delete the user - ', function() {
    beforeEach(function (done) {
      // body...
      testUser = user.forge({
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      testUser.save()
        .then(function() {
          done();
        });
    });

    it('should delete the selected user: ', function(done) {
      user
      .where({email: 'r2p2@jk.com'})
      .destroy()
      .then(function (user) {
        expect(user.toJSON()).toEqual({});
        done();
      })
    });

    afterEach(function (done) {
      knex('users').where('username', 'modeerf').del()
        .then(function(){
          done();
        });
      });
    
  });

  xdescribe('Find a number of users: ', function() {
    beforeEach(function(done) {
      testUsers = users.forge([{
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      }, {
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p@jk.com',
        username: 'freedom',
        password: 'gobbledeedock'
      }])
        .invokeThen('save')
          .then(function () {
            // body...
            done();
          });

    });

    it('it should fetch all users - ', function(done) {
      console.log(testUser);
      testUsers.fetch()
        .then(function(users) {
          console.log(users)
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
  
  xdescribe('template: ', function() {
    beforeEach(function (done) {
      // body...
      testUser = user.forge({
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      testUser.save()
        .then(function() {
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

});
