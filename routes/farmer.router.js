//llamar a express constructor
const express = require('express');
//llamar al servicio
const farmerService = require('./../services/farmer.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createFarmerSchema,
  getFarmerSchema,
  updateFarmerSchema,
} = require('./../schemas/farmer.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new farmerService();

//Ruta para obtener granjeros
router.get('/', async (req, res) => {
  try {
    const farmer = await service.getFarmer();
    res.status(200).json(farmer);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear granjero
router.post('/',
validatorHandler(createFarmerSchema, 'body'),
async (req, res) => {
  try {
    const farmerData = req.body;
    const farmer = await service.addFarmer(farmerData);
    res.status(200).json(farmer);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar granjero
router.patch('/:cedula',
validatorHandler(getFarmerSchema, 'params'),
validatorHandler(updateFarmerSchema, 'body'),
async (req, res) => {
  try {
    const {cedula} = req.params;
    const farmerData = req.body;
    const farmer = await service.editFarmer(cedula, farmerData);
    res.status(200).json(farmer);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar granjero
router.delete('/:cedula',
validatorHandler(getFarmerSchema, 'params'),
async (req, res) =>{
   try {
    const {cedula} = req.params;
    const farmer = await service.deleteFarmer(cedula);
    res.status(200).json(farmer)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;