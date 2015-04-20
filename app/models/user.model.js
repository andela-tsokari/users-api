var dbConfig = require('./../../config/db-config');

var knex = require('knex')(dbConfig.db[process.env.NODE_ENV]);

var bookshelf = require('bookshelf')(knex);

var encrypt = require('bcrypt');

knex.schema.hasTable('users')
  .then( function (exists) {
    // body...
    if (!exists) {
      bookshelf.knex.schema.createTable('users', function(table) {
        table.increments('user_id').primary();
        table.string('first_name', 30).notNullable();
        table.string('last_name', 30).notNullable();
        table.string('email', 30).notNullable().unique();
        table.string('username', 30).notNullable().unique();
        table.string('password').notNullable();
        table.boolean('admin').defaultTo(false);
        table.timestamp('joined_on');
        table.timestamp('last_updated');
      })
      .then(function() {
        console.log('Table has been created');
      });
    }
  });

var user = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'user_id',
    defaults: {
      admin: false
    },
    hasTimestamps: ['joined_on', 'last_updated']
  },
  {
    hidePassword: function(password) {
      return encrypt.hashSync(password, encrypt.genSaltSync(10));
    },
    checkPassword: function(password) {
      return encrypt.compareSync(password, this.password);
    }    
});

var users = bookshelf.Collection.extend({
  model: user
})

module.exports = [user, users];