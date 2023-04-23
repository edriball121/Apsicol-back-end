//llamar a express constructor
const express = require('express');
//llamar a la BBDD
const dbcon = require('./../connection');
//llamar al servicio
const productsService = require('./../services/products2.service');
//llamar al middleware de Schemas
const validatorHandler = require('./../middlewares/validator.handler');
//llamar a los esquemas
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product2.schema');
//llamar el router
const router = express.Router();
const conn = dbcon();
//crear una instancia de servicio
const service = new productsService();

//cuando se envia una ruta de esta manera debe ir al principio luego de la principal, en otra posición
//Generaria un comportamiento inapropiado e inesperado

//get de productos/filter
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

//buscar todos los productos
/*router.get('/', async (req, res) => {
  const products = await service.findProducts();
  res.status(200).json(products)
});*/

//buscar un producto por id
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//post
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.createProduct(body);
    res.status(201).json(newProduct);
  }
);

//patch
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const products = await service.updateProduct(id, body);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

//delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await service.deleteProduct(id);
    res.json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

//llamar producto de la bbdd
router.get('/', async (req, res) => {
  try {
    const product = await service.getProductsBd();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
module.exports = router;