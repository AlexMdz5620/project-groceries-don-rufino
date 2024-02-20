const { create, findAll, findOne, update, softDelet, delet } = require('../models/customers')

const createCustomer = (req, res) => {
  create(req.body)
    .then((customer) => res.status(201).send(customer))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const findAllCustomers = (req, res) => {
  findAll()
    .then((customers) => res.status(200).send(customers))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const findOneCustomer = (req, res) => {
  findOne(req.params.idCustomer)
    .then((customer) => res.status(200).send(customer))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const updateOneCustomer = (req, res) => {
  update(req.params.idCustomer, req.body)
    .then((customer) => res.status(200).send(customer))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const softDeleteOneCustomer = (req, res) => {
  softDelet(req.params.idCustomer)
    .then((customer) => res.status(204)(customer))
    .catch((error) => res.status(400).send({ error: error.message }))
}

const deleteOneCustomer = (req, res) => {
  delet(req.params.idCustomer)
    .then((customer) => res.status(204)(customer))
    .catch((error) => res.status(400).send({ error: error.message }))
}

module.exports = {
  createCustomer,
  findAllCustomers,
  findOneCustomer,
  updateOneCustomer,
  softDeleteOneCustomer,
  deleteOneCustomer
}
