var users = require('./../controllers/users.controllers');
var restrict = require('./../../config/db-config').secret;
var expressJWT = require('express-jwt');

module.exports = function(router) {
  router
    .route('/signup')
    .post(users.signUp);

  router
    .route('/login')
    .post(users.login);

  router
    .route('/auth')
    .get(users.auth);

  /*router
    .route('/logout')
    .get(users.logout);*/

  router
    .route('/users')
    .get(users.getAllUsers);

  router
    .route('/:username')
    .get(expressJWT({secret: restrict}), users.getOneUser)
    .put(expressJWT({secret: restrict}), users.updateOneUser)
    .delete(expressJWT({secret: restrict}), users.deleteUser);

  router
    .route('/user/:username')
    .get(users.getOneUser);

};