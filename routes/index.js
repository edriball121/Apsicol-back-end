//llamar a express constructor
const express = require('express');
//importar las rutas de los archivos .router.js
const farmerRouter = require('./farmer.router')

function routerAPI(app) {
  //definir route padre
  const router = express.Router();
  app.use('/api/v1', router)
  //definir el route
  router.use('/farmer', farmerRouter);
}

module.exports = routerAPI;
