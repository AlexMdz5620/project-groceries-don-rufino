/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('sales').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('sales', function (table) {
        table.increments('sales_id').primary()
        table.integer('product_id').unsigned().references('products.product_id').notNullable()
        table.integer('customer_id').unsigned().references('customers.customer_id').notNullable()
        table.integer('num_sales').notNullable()
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
  return knex.schema.hasTable('sales').then(function (exists) {
    if (exists) {
      return knex.schema.dropTable('sales')
    }
  })
}
