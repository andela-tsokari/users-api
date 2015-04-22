var user = require('./../models/user.model')[0];
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var secret = require('./../../config/db-config').secret;

module.exports = {
  //successful signup request, using bcrypt
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
                      savedUser
                        .fetch()
                        .then(function(userForEdit) {
                          bcrypt.hash(userForEdit.get('password'), 10, function(err, hash) {
                            if(hash) {
                              userForEdit
                                .save({
                                  password: hash
                                }, {
                                  method: 'update',
                                  patch: true
                                })
                                .then(function(updatedSavedUser) {
                                  response
                                    .status(200)
                                    .json({
                                      message: 'You have successfully signed up',
                                      data: updatedSavedUser.toJSON()
                                    });
                                });
                            }
                            else {
                              response
                                .json({
                                  error: error.message
                                });
                            }
                          });
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
      .then(function(users) {
        if(users){
          users
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
        else {
          response
            .json({
              error: 'there are no users in this database'
            });
        }
      });
  
  },

  //successful request to get one user.
  getOneUser: function(request, response) {
    user
      .where({username: request.params.username})
      .fetch()
      .then(function(singleUser) {
        if(singleUser) {
          response
            .status(200)
            .json({
              data: singleUser.toJSON()
            });
        }
        else if(!singleUser) {
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

  //successful delete user request
  deleteUser: function(request, response) {
    user
      .where({username: request.params.username})
      .destroy()
      .then(function(deletedUser) {
        response
          .status(204)
          .json({
            message: 'user was successfully deleted',
          });
      });

  },

  //successful login using bcrypt
  login: function(request, response) {
    if(!(request.body.username && request.body.password)) {
      response
        .status(400)
        .json({
          message: 'Username and Password Required'
        });
    }
    else {
        user
          .where({
            username: request.body.username
          })
          .fetch()
          .then(function(dbuser) {
            bcrypt.compare(request.body.password, dbuser.get('password'), function(err, match) {
              if(match){
                var profile = {
                  username: dbuser.attributes.username,
                  password: dbuser.attributes.password
                }
                
                var token = jwt.sign(profile, secret);

                response
                  .status(200)
                  .json({
                    message: 'you are signed in',
                    username: dbuser.attributes.username,
                    access_token: token
                  });
              }
              else {
                response
                  .json({
                    error: 'Incorrect Username/Password'
                  });
              }
              
            });
          });
    }

  },

  auth: function(request, response) {
    // hWT : header With Token

    var hWT = request.get('Authorization');

    // console.log(hWT);

    var token = hWT.substring(7);

    // console.log(token);
    
    var details = jwt.decode(token);

    // console.log(details);

    // checks if the token is valid

    if (details === null) {
      response
        .status(401)
        .json({
          auth_status: false,
          message: 'You do not have the authorization for this page'
        });

    }

    // if token is valid, search for a user in the user's database that matches the user in the token
    
    else {
      user
        .where({
          username: details.username
        })
        .fetch()
        .then(function(dbuser) {
          if(dbuser){
            response
              .status(200)
              .json({
                user: dbuser.attributes.username,
                auth_status: true,
                message: dbuser.attributes.username + ' is registered and authorised'
              });

          }

          else {
            response
              .status(401)
              .json({
                user: details.username,
                auth_status: false,
                message: details.username + ' is not registered as a User Here. Do Sign Up.'
              });

          }

        });

    }

  }

};