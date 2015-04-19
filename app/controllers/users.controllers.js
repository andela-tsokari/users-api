var user = require('./../models/user.model')[0];
var encrypt = require('bcrypt');

module.exports = {
  //successful signup request
  signUp: function(request, response) {
    if(!(request.body.first_name && request.body.last_name && request.body.email && request.body.username && request.body.password)) {
      response
        .status(400)
          .json({
            message: 'check that all form fields are filled'
          });
    }

    else {
      user
        .where({email: request.body.email})
          .fetch()
            .then(function(dbuser) {
              if(dbuser) {
                response
                  .status(401)
                    .json({
                      message: "a user with email: " + request.body.email + " already exists"
                    });
              }
              else {
                user
                  .where({username: request.body.username})
                    .fetch()
                      .then(function(dbuser) {
                        if (dbuser){
                          response
                            .status(401)
                              .json({
                                message: "a user with username: " + request.body.username + " already exists"
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
                                .then(function(savedUser) {
                                  response
                                    .status(200)
                                      .json({
                                        message: "user saved successfully"
                                      });
                                });

                        }
                      });
              }
            });
    }

  },

  //successful request to get users
  getAllUsers: function(request, response) {
    user
      .fetchAll()
        .then(function(user) {
          if(user){
            user
              .fetch()
                .then(function(user) {
                  response
                    .status(200)
                      .json({
                        data: user.toJSON()
                      });
                })
                .catch(function(error) {
                  response
                    .status(401)
                      .json({
                        message: 'there are no users saved'
                      });
                    });
          }
        });
  
  },

  //successful request to get one user.
  getOneUser: function(request, response) {
    user
      .where({username: request.params.username})
        .fetch()
          .then(function(user) {
            if(user) {
              response
                .status(200)
                  .json({
                    data: user.toJSON()
                  });
            }
            else if(!user) {
              response
                .status(400)
                  .json({
                    message: 'user does not exist'
                  });
            }
          });

  },
  //successful update user request
  updateOneUser: function(request, response) {
    user
      .where({username: request.params.username})
        .save(request.body, {
          method: 'update',
          patch: true
        })
          .then(function(changedUser) {
            response
              .status(200)
                .json({
                  message: 'your details have been changed successfully',
                  data: changedUser.toJSON()
                });
          });

  },

  deleteUser: function(request, response) {

  },

  login: function(request, response) {
    if(!(request.body.username && request.body.password)) {

    }

    user
      .where({username: username})
        .fetch
  
  }

};