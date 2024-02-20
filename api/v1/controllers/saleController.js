const { create, findAll, findOneCustomer, findOneProduct, delet } = require('../models/sales')

const createSale = (req, res) => {
  create(req.body)
    .then((product) => res.status(201).send(product))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const findAllSales = (req, res) => {
  findAll()
    .then((sales) => res.status(200).send(sales))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const findSalesOfOneCustomer = (req, res) => {
  findOneCustomer(req.params.idProduct)
    .then((sale) => res.status(200).send(sale))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const findSalesOfOneProduct = (req, res) => {
  findOneProduct(req.params.idProduct)
    .then((sale) => res.status(200).send(sale))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const deleteOneSale = (req, res) => {
  delet(req.params.idProduct)
    .then((sale) => res.status(204)(sale))
    .catch((error) => res.status(400).send({ error: error.message }))
}

module.exports = {
  createSale,
  findAllSales,
  findSalesOfOneCustomer,
  findSalesOfOneProduct,
  deleteOneSale
}
