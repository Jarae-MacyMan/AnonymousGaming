/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
      table.increments("user_id").primary();
      table.string("email").unique().notNullable();
      table.string("username", 30).notNullable();
      table.string("password").notNullable();
      table.string("profile_pic");
      table.integer("games_won");
      table.integer("games_lost");
      table.string("title");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  