//llamar a express constructor
const express = require('express');
//llamar al servicio
const farmerService = require('./../services/farmer.service')
//llamar al middleware de Schemas
const {validatorHandler} = require('./../middlewares/validator.handler');
//llamar a los esquemas
const {
  getFarmerSchema,
  createFarmerSchema,
  updateFarmerSchema,
} = require('./../schemas/farmer.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new farmerService();

//----------------Rutas-----------------
//Get granjeros
router.get('/',
validatorHandler,
async (req, res) => {
  const farmer = await service.getFarmer();
  res.status(200).json(farmer);
});
