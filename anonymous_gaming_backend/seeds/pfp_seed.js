/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //await knex('pfp').del()
  await knex('profile_pic').insert([
    {file: 'Pic'},
  ]);
};
