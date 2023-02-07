"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friend_status", function (table) {
    table.increments("friend_id").primary();
    table["boolean"]("status").notNullable();
    table.integer("userA_id").notNullable();
    table.integer("userB_id").notNullable();
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