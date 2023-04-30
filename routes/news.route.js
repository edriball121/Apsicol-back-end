//llamar a express constructor
const express = require('express');
//llamar al servicio
const newsService = require('./../services/news.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createNewsSchema,
  getNewsSchema,
  updateNewsSchema,
} = require('./../schemas/news.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new newsService();

//Ruta para obtener noticias
router.get('/', async (req, res) => {
  try {
    const news = await service.getNews();
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para obtener 5 noticias
router.get('/top', async (req, res) => {
  try {
    const newsTop = await service.getNewsTop();
    res.status(200).json(newsTop);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear administrador
router.post('/',
validatorHandler(createNewsSchema, 'body'),
async (req, res) => {
  try {
    const newsData = req.body;
    const news = await service.addNews(newsData);
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar administrador
router.patch('/:id',
validatorHandler(getNewsSchema, 'params'),
validatorHandler(updateNewsSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const newsData = req.body;
    const news = await service.editNews(parseInt(id), newsData);
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar administrador
router.delete('/:id',
validatorHandler(getNewsSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const news = await service.deleteNews(parseInt(id));
    res.status(200).json(news)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
