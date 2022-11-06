/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      content:
        "Play uno with me!",
      user_id: 2,
    },
    {
      content:
        "Anyone wanna play a game?",
      user_id: 1,
    },
  ]);
};
