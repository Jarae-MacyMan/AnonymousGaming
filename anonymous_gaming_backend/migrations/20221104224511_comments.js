/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("comments", function (table) {
      table.increments("comments_id").primary();
      table.string("content").notNullable();
      table.integer("posts_id").references("posts_id").inTable("posts");
      table.integer("user_id").references("user_id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("comments");
  };
  