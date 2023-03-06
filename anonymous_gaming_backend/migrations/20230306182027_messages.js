/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("messages", function (table) {
        table.increments("message_id").primary();
        table.integer("chat_id").references("chat_id").inTable("chats");
        table.integer("sender_id").references("user_id").inTable("users");
        table.string("text").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("messages");
};
