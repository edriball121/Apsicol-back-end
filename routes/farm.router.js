//llamar a express constructor
const express = require('express');
//llamar al servicio
const farmService = require('./../services/farm.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createFarmSchema,
  getFarmSchema,
  updateFarmSchema,
} = require('./../schemas/farm.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new farmService();

//Ruta para obtener fincas
router.get('/', async (req, res) => {
  try {
    const farm = await service.getFarm();
    res.status(200).json(farm);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear finca
router.post('/',
validatorHandler(createFarmSchema, 'body'),
async (req, res) => {
  try {
    const farmData = req.body;
    const farm = await service.addFarm(farmData);
    res.status(200).json(farm);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar finca
router.patch('/:id',
validatorHandler(getFarmSchema, 'params'),
validatorHandler(updateFarmSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const farmData = req.body;
    const farm = await service.editFarm(parseInt(id), farmData);
    res.status(200).json(farm);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar finca
router.delete('/:id',
validatorHandler(getFarmSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const farm = await service.deleteFarm(parseInt(id));
    res.status(200).json(farm)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
