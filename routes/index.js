//llamar a express constructor
const express = require('express');
//importar las rutas de los archivos .router.js
const farmerRouter = require('./farmer.router');
const adminRouter = require('./admin.router');
const consultanRouter = require('./consultant.router');
const agricolaRouter = require('./farming.router');
const pecuarioRouter = require('./livestock.router');
const noticiasRouter = require('./news.route');
const empresaRouter = require('./company.router');
const canastaFamiliarRouter = require('./familyBasket.router');

function routerAPI(app) {
  //definir route padre
  const router = express.Router();
  app.use('/api/v1', router)
  //definir el route
  router.use('/farmer', farmerRouter);
  router.use('/admin', adminRouter);
  router.use('/consultant', consultanRouter);
  router.use('/farming', agricolaRouter);
  router.use('/livestock', pecuarioRouter);
  router.use('/news', noticiasRouter);
  router.use('/company', empresaRouter);
  router.use('/familyBasket', canastaFamiliarRouter);
}

module.exports = routerAPI;
