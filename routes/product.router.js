//llamar a express constructor
const express = require('express');
//llamar al servicio
const productService = require('./../services/product.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require('./../schemas/product.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new productService();

//Ruta para obtener productos
router.get('/', async (req, res) => {
  try {
    const product = await service.getProduct();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear producto
router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  try {
    const productData = req.body;
    const product = await service.addProduct(productData);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar producto
router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const productData = req.body;
    const product = await service.editProduct(parseInt(id), productData);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar producto
router.delete('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const product = await service.deleteProduct(parseInt(id));
    res.status(200).json(product)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
