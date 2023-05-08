//llamar a express constructor
const express = require('express');
//importar las rutas de los archivos .router.js
const farmerRouter = require('./farmer.router');
const adminRouter = require('./admin.router');
const consultanRouter = require('./consultant.router');
const farmigRouter = require('./farming.router');
const liveStockRouter = require('./livestock.router');
const newsRouter = require('./news.route');
const companyRouter = require('./company.router');
const familyBasketRouter = require('./familyBasket.router');
const cityRouter = require('./city.router');

function routerAPI(app) {
  //definir route padre
  const router = express.Router();
  app.use('/api/v1', router)
  //definir el route
  router.use('/farmer', farmerRouter);
  router.use('/admin', adminRouter);
  router.use('/consultant', consultanRouter);
  router.use('/farming', farmigRouter);
  router.use('/livestock', liveStockRouter);
  router.use('/news', newsRouter);
  router.use('/company', companyRouter);
  router.use('/familyBasket', familyBasketRouter);
  router.use('/city', cityRouter);
}

module.exports = routerAPI;
