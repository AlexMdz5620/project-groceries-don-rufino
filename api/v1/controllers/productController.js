const { create, findAll, findOne, update, softDelet, delet } = require('../models/products')

const createProduct = (req, res) => {
  create(req.body)
    .then((product) => res.status(201).send(product))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const findAllProducts = (req, res) => {
  findAll()
    .then((products) => res.status(200).send(products))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const findOneProduct = (req, res) => {
  findOne(req.params.idProduct)
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const updateOneProduct = (req, res) => {
  update(req.params.idProduct, req.body)
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const softDeleteOneProduct = (req, res) => {
  softDelet(req.params.idProduct)
    .then((product) => res.status(204)(product))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const deleteOneProduct = (req, res) => {
  delet(req.params.idProduct)
    .then((product) => res.status(204)(product))
    .catch((error) => res.status(400).send({ error: error.message }))
}

module.exports = {
  createProduct,
  findAllProducts,
  findOneProduct,
  updateOneProduct,
  softDeleteOneProduct,
  deleteOneProduct
}
