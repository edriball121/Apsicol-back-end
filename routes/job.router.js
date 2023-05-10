//llamar a express constructor
const express = require('express');
//llamar al servicio
const jobService = require('./../services/job.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createJobSchema,
  getJobSchema,
  updateJobSchema,
} = require('./../schemas/job.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new jobService();

//Ruta para obtener trabajos
router.get('/', async (req, res) => {
  try {
    const job = await service.getJob();
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear trabajo
router.post('/',
validatorHandler(createJobSchema, 'body'),
async (req, res) => {
  try {
    const jobData = req.body;
    const job = await service.addJob(jobData);
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar trabajo
router.patch('/:id',
validatorHandler(getJobSchema, 'params'),
validatorHandler(updateJobSchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const jobData = req.body;
    const job = await service.editJob(parseInt(id), jobData);
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar trabajo
router.delete('/:id',
validatorHandler(getJobSchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const job = await service.deleteJob(parseInt(id));
    res.status(200).json(job)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
