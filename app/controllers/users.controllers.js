var user = require('./../models/user.model')[0];
var encrypt = require('bcrypt')

module.exports = {
  getAllUsers: function(request, response) {
    user
      .fetch()
        .then(function(error, users) {
          if(error){
            response.json({message: 'there are no users saved'});
          }
          else {
            response.json(users);
          }
        });

  },

  getOneUser: function(request, response) {
    var user = request.params.username;

    user
      .where({username: user})
        .then(function(error, user) {
          if(error){
            response.json({message: 'there is no user with this username'});
          }
          else {
            response.json(user);
          }
        });

  },

  signUp: function(request, response) {
    if(!(request.body.first_name && request.body.last_name && request.body.email && request.body.username && request.body.password)) {
      response
        .status(400)
          .json({message: 'check that all form fields are filled'});
    }
    else{
      user
        .forge({
          email: request.body.email,
          username: request.body.username
        })
          .fetch()
            .then(function(user) {
              if(user) {
                response
                  .status(400)
                    .json({
                      message: 'a user already exist with these details',
                      data: request.body
                    });
              }
              else {
                user
                  .forge({
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    email: request.body.email,
                    username: request.body.username,
                    password: request.body.password
                  })
                    .save()
                      .then(function(user) {
                        response
                          .status(200)
                            .json({
                              message: 'User has been successfully created',
                              data: request.body
                            });
                      });
              }
            })
    }

  },

  login: function(request, response) {
    if(!(request.body.username && request.body.password)) {

    }

    user
      .where({username: username})
        .fetch
  }
};