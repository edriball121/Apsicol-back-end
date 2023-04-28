//llamar a express constructor
const express = require('express');
//llamar al servicio
const livestockService = require('../services/livestock.service');
//llamar middlewares
const validatorHandler = require('../middlewares/validator.handler');
//se reutilisa el schema de farming
const {
  createFarmingSchema,
  getFarmingSchema,
  updateFarmingSchema,
} = require('../schemas/farming.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new livestockService();

//Ruta para obtener productos pecuario
router.get('/', async (req, res) => {
  try {
    const livestock = await service.getLivestock();
    res.status(200).json(livestock);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear producto pecuario
router.post('/',
validatorHandler(createFarmingSchema, 'body'),
async (req, res) => {
  try {
    const livestockData = req.body;
    const livestock = await service.addLivestock(livestockData);
    res.status(200).json(livestock);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar producto pecuario
router.patch('/:id',
validatorHandler(getFarmingSchema, 'params'),
validatorHandler(updateFarmingSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const livestockData = req.body;
    const livestock = await service.editLivestock(parseInt(id), livestockData);
    res.status(200).json(livestock);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar producto pecuario
router.delete('/:id',
validatorHandler(getFarmingSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const livestock = await service.deleteLivestock(parseInt(id));
    res.status(200).json(livestock)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
