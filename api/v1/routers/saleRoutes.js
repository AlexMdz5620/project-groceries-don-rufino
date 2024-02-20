const express = require('express')
const router = express.Router()
const saleController = require('../controllers/saleController')

router.post('/sales', saleController.createSale)
router.get('/sales', saleController.findAllSales)
router.get('/sales/customers/:idCustomer', saleController.findSalesOfOneCustomer)
router.patch('/products/products/:idProduct', saleController.findSalesOfOneProduct)
router.delete('/products/:idProduct', saleController.deleteOneSale)

module.exports = router
