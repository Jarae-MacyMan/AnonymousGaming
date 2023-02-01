"use strict";

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
    table.integer("profile_pic_id");
    table.integer("games_won").defaultTo('0');
    table.integer("games_lost").defaultTo('0');
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