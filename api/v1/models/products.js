const knex = require('../../../config')

const create = (bodyProduct) => {
  return knex
    .insert(bodyProduct)
    .into('products')
    .returning('*')
}

const findAll = () => {
  return knex
    .select('*')
    .from('products')
    .where('active', true)
}

const findOne = (productId) => {
  return knex
    .select('*')
    .from('products')
    .where('product_id', productId)
    .where('active', true)
}

const update = (productId, bodyToUpdate) => {
  return knex
    .update(bodyToUpdate)
    .from('products')
    .where('product_id', productId)
    .returning('*')
}

const softDelet = (productId) => {
  return knex
    .update({ isActiv: false })
    .from('products')
    .where('product_id', productId)
}

const delet = (productId) => {
  return knex
    .del()
    .from('products')
    .where('product_id', productId)
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  softDelet,
  delet
}
