
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('password');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('favorites', function (table) {
      table.increments('id').primary();
      table.integer('movie_id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('title');
      table.string('poster_path');
      table.string('release_date');
      table.string('vote_average');
      table.string('overview');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('users')
  ]);
};
