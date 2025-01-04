/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('todos', table => {
        table.string('id').primary().unique().notNullable();
        table.string('title').notNullable();
        table.string('description').defaultTo('');
        table.boolean('done').defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('todos');
};
