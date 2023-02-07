"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friend_status", function (table) {
    table.increments("friend_id").primary();
    table.integer("usera_id").notNullable();
    table.integer("userb_id").notNullable();
    table["boolean"]("status").notNullable();
    table.timestamp("request_sent").defaultTo(knex.fn.now());
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.down = function (knex) {
  return knex.schema.dropTable("friend_status");
};