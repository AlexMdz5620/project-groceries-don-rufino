/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('products').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('products', function (table) {
        table.increments('product_id').primary()
        table.string('name_product', [150]).notNullable().defaultTo('')
        table.text('description').notNullable().defaultTo('')
        table.integer('price').notNullable()
        table.text('sku', [8]).unique().notNullable()
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
  return knex.schema.hasTable('products').then(function (exists) {
    if (exists) {
      return knex.schema.dropTable('products')
    }
  })
}
