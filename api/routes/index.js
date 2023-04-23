//llamar a express constructor
const express = require('express');
//importar las rutas de los archivos .router.js
const productsRouter = require('./products2.router');
const usersRouter = require('./users2.router');
const categoriesRouter = require('./categories2.router');
const farmerRouter = require('./farmer.router')

function routerAPI(app) {
  //definir route padre
  const router = express.Router();
  app.use('/api/v1', router)
  //definir el route
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/farmer', farmerRouter);
}

module.exports = routerAPI;
