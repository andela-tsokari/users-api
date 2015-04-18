var user = require('./../../app/models/user.model')[0],
    users = require('./../../app/models/user.model')[1];
var dbConfig = require('./../../config/db-config');
var knex = require('knex')(dbConfig.db[process.env.NODE_ENV]);

var testUser, testUsers;
describe('User API unit tests: ', function () {

  describe('Save a new user - ', function(){
    beforeEach(function (done) {
      
      testUser = user.forge({
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      });
      done();
    });


    it('it should save without problems', function (done) {
                
      testUser.save()
        .then(function (testUser) {
          
          expect(testUser.attributes)
            .toEqual(jasmine.objectContaining({
              "username": "modeerf",
              "password": "gobbledeedock"
            }));
          done();
        });
    });

    it('it should not save if first_name is null', function(done) {
      testUser.set({first_name: null});

      testUser.save()
        .then(function(testUser) {

        })
        .catch(function(error) {
          expect(error).toBeDefined();
          done();
        });
    });

    it('it should not save if last_name is null', function(done) {
      testUser.set({last_name: null});

      testUser.save()
        .then(function(testUser) {

        })
        .catch(function(error) {
          expect(error).toBeDefined();
          done();
        });
    });

    it('it should not save if email is null', function(done) {
      testUser.set({email: null});

      testUser.save()
        .then(function(testUser) {

        })
        .catch(function(error) {
          expect(error).toBeDefined();
          done();
        });
    });

    it('it should not save if username is null', function(done) {
      testUser.set({username: null});

      testUser.save()
        .then(function(testUser) {

        })
        .catch(function(error) {
          expect(error).toBeDefined();
          done();
        });
    });

    it('it should not save if password is null', function(done) {
      testUser.set({password: null});

      testUser.save()
        .then(function(testUser) {

        })
        .catch(function(error) {
          expect(error).toBeDefined();
          done();
        });
    });

    it('it should save a user\'s admin status as false by default', function(done) {
      testUser.save()
        .then(function (testUser) {
          expect(testUser.attributes).toEqual(jasmine.objectContaining({"admin": false}));
          done();
        });
    });

    it('it should not save if email is not unique', function (done) {
      users.forge([
      { 
        first_name: 'use',
        last_name: 'her',
        email: 'forget@her.better',
        username: 'user1',
        password: 'user1pwd'
      }, 
      {
        first_name: 'love',
        last_name: 'her',
        email: 'forget@her.better',
        username: 'user2',
        password: 'user2pwd'
      }
      ])
        .invokeThen('save')
          .then(function (users) {
            done();
          })
          .catch(function (error) {
            expect(error).toBeDefined();
            done();
          });
    });

    it('it should not save if username is not unique', function(done) {
      users.forge([
      { 
        first_name: 'use',
        last_name: 'her',
        email: 'make@her.better',
        username: 'user1',
        password: 'user1pwd'
      }, 
      {
        first_name: 'love',
        last_name: 'her',
        email: 'make@me.better',
        username: 'user1',
        password: 'user2pwd'
      }
      ])
        .invokeThen('save')
          .then(function (users) {
           
          })
          .catch(function (error) {
            
            expect(error).toBeDefined();
            done();
          });
    });


    afterEach(function (done) {
      knex('users').where(1, 1).del()
        .then(function () {
          
          done();
        });
    });

  });

  describe('Find all users from the user table - ', function () {
    
    beforeEach(function (done) {
      
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

    it('it should return saved user', function(done) {
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
      knex('users').where(1,1).del()
        .then(function(){
          done();
        });
    });

  });

  describe('Find a user from the user table - ', function() {
    beforeEach(function (done) {
      
      testUsers = users.forge([{
        first_name: 'port',
        last_name: 'harcourt',
        email: 'r2p2@jk.com',
        username: 'modeerf',
        password: 'gobbledeedock'
      }, 
      {
        first_name: 'lagos',
        last_name: 'city',
        email: 'lp@ban.ky',
        username: 'lasgidi',
        password: 'ridinDirty'
      }])
        .invokeThen('save')
          .then(function(testUsers) {
            done();
          });
    });

    it('it should return a particular user', function(done) {
      user
        .where({email: 'lp@ban.ky'})
          .fetch()
          .then(function(user) {
            console.log(user)
            expect(user.attributes).toEqual(jasmine.objectContaining({email:'lp@ban.ky'}));
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

  describe('Find a user and update any details -  ', function() {
    beforeEach(function (done) {
      
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

    it('it should update the user details: ', function(done) {
      user
        .where({
          first_name: 'port'
        })
        .save({
          first_name: 'Las'
        }, 
        {
          method: 'update'
        })
        .then(function(user) {
          expect(user.toJSON()).toEqual(jasmine.objectContaining({first_name: 'Las'}));
          done();
        });

    });

    afterEach(function (done) {
      knex('users').where(1,1).del()
        .then(function(){
          done();
        });
      });
    
  });

  describe('Find a user and delete the user - ', function() {
    beforeEach(function (done) {
      
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

});
