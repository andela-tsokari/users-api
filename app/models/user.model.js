var dbConfig = require('./../../config/db-config');

var knex = require('knex')(dbConfig.db[process.env.NODE_ENV]);

var bookshelf = require('bookshelf')(knex);

knex.schema.hasTable('users')
  .then( function (exists) {
    // body...
    if (!exists) {
      bookshelf.knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('first_name', 30).notNullable();
        table.string('last_name', 30).notNullable();
        table.string('email', 30).unique().notNullable();
        table.string('username', 30).unique().notNullable();
        table.string('password', 30).notNullable();
        table.boolean('admin').defaultTo(false);
        table.timestamp('joined_on');
        table.timestamp('last_update');
      })
      .then(function() {
        console.log('Table has been created');
      });
    }
  });

var userModel = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: ['joined_on', 'last_update']
});

module.exports = userModel;