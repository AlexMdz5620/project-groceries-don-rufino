require('dotenv').config()
// importar express
const express = require('express')
// Importar rutas de mis vistas
const customerRoutes = require('./api/v1/routers/customerRoutes')
const productRoutes = require('./api/v1/routers/productRoutes')
const saleRouters = require('./api/v1/routers/saleRoutes')
// creamos una instancia
const app = express()

// Middlewares (configurar la app) / Opcional
app.use(express.json()) // datos de JSON
app.use(express.urlencoded({ extended: true })) // datos de formularios

// Crear Rutas
app.use('/api/v1/', customerRoutes)
app.use('/api/v1/', productRoutes)
app.use('/api/v1/', saleRouters)

// levantar el servidor
app.listen(3001, () => {
  console.log('Server on port 3001')
})
