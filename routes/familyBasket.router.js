//llamar a express constructor
const express = require('express');
//llamar al servicio
const familyBasketService = require('./../services/familyBasket.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createFamilyBasketSchema,
  getFamilyBasketSchema,
  updateFamilyBasketSchema,
} = require('./../schemas/familyBasket.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new familyBasketService();

//Ruta para obtener canasta familiar
router.get('/', async (req, res) => {
  try {
    const familyBasket = await service.getFamilyBasket();
    res.status(200).json(familyBasket);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear canasta familiar
router.post('/',
validatorHandler(createFamilyBasketSchema, 'body'),
async (req, res) => {
  try {
    const familyBasketData = req.body;
    const familyBasket = await service.addFamilyBasket(familyBasketData);
    res.status(200).json(familyBasket);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar canasta familiar
router.patch('/:id',
validatorHandler(getFamilyBasketSchema, 'params'),
validatorHandler(updateFamilyBasketSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const familyBasketData = req.body;
    const familyBasket = await service.editFamilyBasket(parseInt(id), familyBasketData);
    res.status(200).json(familyBasket);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar canasta familiar
router.delete('/:id',
validatorHandler(getFamilyBasketSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const familyBasket = await service.deleteFamilyBasket(parseInt(id));
    res.status(200).json(familyBasket)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
