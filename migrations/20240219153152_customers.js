/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('customers').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('customers', function (table) {
        table.increments('customer_id').primary()
        table.string('first_name', [150]).notNullable().defaultTo('')
        table.string('last_name', [150]).notNullable().defaultTo('')
        table.string('email', [150]).unique().notNullable().defaultTo('')
        table.string('password', [150]).notNullable().defaultTo('')
        table.string('phone', [10]).notNullable().defaultTo('')
        table.text('address').notNullable().defaultTo('')
        table.string('postal_code', [5]).notNullable().defaultTo('')
        table.string('neighborhood_or_colony', [100]).notNullable().defaultTo('')
        table.string('city', [100]).notNullable().defaultTo('')
        table.boolean('active').notNullable().defaultTo(true)
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    }
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('customers').then(function (exists) {
    if (exists) {
      return knex.schema.dropTable('customers')
    }
  })
}
