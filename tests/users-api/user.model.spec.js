var userModel = require('./../../app/models/user.model');

var user;

describe('User API unit tests: ', function () {
  // body...
  beforeEach(function (done) {
    // body...
    user = new userModel({
      username: 'freedom',
      password: 'gobbledeedock'
    });
    done();
  });

  describe('Create a Table and Save a new user - ', function(){
    it('should save without problems', function (done) {
      // body...          
      console.log('i got here');
      user.save()
        .then(function (model) {
          // body...
          expect(model.attributes)
            .toEqual(jasmine.objectContaining({
              "username": "freedom",
              "password": "gobbledeedock"
            }));
          done();
        });
    });
  });
});
