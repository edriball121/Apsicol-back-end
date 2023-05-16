//llamar a express constructor
const express = require('express');
//llamar al servicio
const servicesService = require('./../services/services.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createServicesSchema,
  getServicesSchema,
  updateServicesSchema,
} = require('./../schemas/services.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new servicesService();

//Ruta para obtener servicios
router.get('/', async (req, res) => {
  try {
    const services = await service.getServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear servicios
router.post('/',
validatorHandler(createServicesSchema, 'body'),
async (req, res) => {
  try {
    const servicesData = req.body;
    const services = await service.addServices(servicesData);
    res.status(200).json(services);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar servicios
router.patch('/:id',
validatorHandler(getServicesSchema, 'params'),
validatorHandler(updateServicesSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const servicesData = req.body;
    const services = await service.editServices(parseInt(id), servicesData);
    res.status(200).json(services);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar servicios
router.delete('/:id',
validatorHandler(getServicesSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const services = await service.deleteServices(parseInt(id));
    res.status(200).json(services)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
