const knex = require('../../../config')

const create = (bodySales) => {
  return knex
    .insert(bodySales)
    .into('sales')
    .returning('*')
}

const findAll = () => {
  return knex
    .select('*')
    .from('sales')
}

const findOneCustomer = (customerId) => {
  return knex
    .select('*')
    .from('sales')
    .where('customer_id', customerId)
}

const findOneProduct = (productId) => {
  return knex
    .select('*')
    .from('sales')
    .where('product_id', productId)
}

const delet = (salesId) => {
  return knex
    .del()
    .from('sales')
    .where('sales_id', salesId)
}

module.exports = {
  create,
  findAll,
  findOneCustomer,
  findOneProduct,
  delet
}
