//llamar a express constructor
const express = require('express');
//llamar al servicio
const queryMessageService = require('./../services/queryMessage.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createQueryMessageSchema,
  getQueryMessageSchema,
  updateQueryMessageSchema,
} = require('./../schemas/queryMessage.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new queryMessageService();

//Ruta para obtener mensaje consulta
router.get('/', async (req, res) => {
  try {
    const queryMessage = await service.getQueryMessage();
    res.status(200).json(queryMessage);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear mensaje consulta
router.post('/',
validatorHandler(createQueryMessageSchema, 'body'),
async (req, res) => {
  try {
    const queryMessageData = req.body;
    const queryMessage = await service.addQueryMessage(queryMessageData);
    res.status(200).json(queryMessage);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar mensaje consulta
router.patch('/:id',
validatorHandler(getQueryMessageSchema, 'params'),
validatorHandler(updateQueryMessageSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const queryMessageData = req.body;
    const queryMessage = await service.editQueryMessage(parseInt(id), queryMessageData);
    res.status(200).json(queryMessage);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar mensaje consulta
router.delete('/:id',
validatorHandler(getQueryMessageSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const queryMessage = await service.deleteQueryMessage(parseInt(id));
    res.status(200).json(queryMessage)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
