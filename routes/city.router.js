//llamar a express constructor
const express = require('express');
//llamar al servicio
const cityService = require('./../services/city.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCitySchema,
  getCitySchema,
  updateCitySchema,
} = require('./../schemas/city.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new cityService();

//Ruta para obtener ciudades
router.get('/', async (req, res) => {
  try {
    const city = await service.getCity();
    res.status(200).json(city);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear ciudad
router.post('/',
validatorHandler(createCitySchema, 'body'),
async (req, res) => {
  try {
    const cityData = req.body;
    const city = await service.addCity(cityData);
    res.status(200).json(city);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar ciudad
router.patch('/:id',
validatorHandler(getCitySchema, 'params'),
validatorHandler(updateCitySchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const cityData = req.body;
    const city = await service.editCity(parseInt(id), cityData);
    res.status(200).json(city);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar ciudad
router.delete('/:id',
validatorHandler(getCitySchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const city = await service.deleteCity(parseInt(id));
    res.status(200).json(city)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
