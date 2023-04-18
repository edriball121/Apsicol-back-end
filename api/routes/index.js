//llamar a express constructor
const express = require('express');
//importar las rutas de los archivos .router.js
//const farmerRouter = require('./farmer.router');
const productsRouter = require('./products2.router');

function routerAPI(app) {
  //definir route padre
  const router = express.Router();
  app.use('/api/v1', router)
  //definir el route
  //router.use('/farmer', farmerRouter);
  router.use('/products', productsRouter);
}

module.exports = routerAPI;
