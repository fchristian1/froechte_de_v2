/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    //add userid to todos table
    return knex.schema.table('todos', table => {
        table.string('userid').notNullable().defaultTo("");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    //remove userid from todos table
    return knex.schema.table('todos', table => {
        table.dropColumn('userid');
    });
};
