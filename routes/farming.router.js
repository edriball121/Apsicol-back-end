//llamar a express constructor
const express = require('express');
//llamar al servicio
const farmingService = require('./../services/farming.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createFarmingSchema,
  getFarmingSchema,
  updateFarmingSchema,
} = require('./../schemas/farming.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new farmingService();

//Ruta para obtener productos agricolas
router.get('/', async (req, res) => {
  try {
    const farming = await service.getFarming();
    res.status(200).json(farming);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear producto agricola
router.post('/',
validatorHandler(createFarmingSchema, 'body'),
async (req, res) => {
  try {
    const farmingData = req.body;
    const farming = await service.addFarming(farmingData);
    res.status(200).json(farming);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar producto agricola
router.patch('/:id',
validatorHandler(getFarmingSchema, 'params'),
validatorHandler(updateFarmingSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const farmingData = req.body;
    const farming = await service.editFarming(parseInt(id), farmingData);
    res.status(200).json(farming);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar producto agricola
router.delete('/:id',
validatorHandler(getFarmingSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const farming = await service.deleteFarming(id);
    res.status(200).json(farming)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
