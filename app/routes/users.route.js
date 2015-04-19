var users = require('./../controllers/users.controllers');

module.exports = function(router) {
  router
    .route('/signup')
      .post(users.signUp);

  router
    .route('/login')
      .post(users.login);

  router
    .route('/users')
      .get(users.getAllUsers);

  router
    .route('/user/:username')
      .get(users.getOneUser)
      .put(users.updateOneUser)
      .delete(users.deleteUser);

};