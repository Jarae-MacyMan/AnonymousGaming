/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("likes", (table) => {
      table.increments("likes_id").primary();
      table.integer("user_id").references("user_id").inTable("users");
      table.integer("posts_id").references("posts_id").inTable("posts");
      table.integer("comments_id").references("comments_id").inTable("comments");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("likes");
  };