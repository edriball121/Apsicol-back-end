//llamar a express constructor
const express = require('express');
//llamar al servicio
const consultationService = require('./../services/consultation.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createConsultationSchema,
  getConsultationSchema,
  updateConsultationSchema,
} = require('./../schemas/consultation.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new consultationService();

//Ruta para obtener consultas
router.get('/', async (req, res) => {
  try {
    const consultantion = await service.getConsultation();
    res.status(200).json(consultantion);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para obtener una consulta
router.get(
  '/:radicado',
  validatorHandler(getConsultationSchema, 'params'),
  async (req, res) => {
    try {
      const { radicado } = req.params;
      const consultantion = await service.getOneConsultation(
        parseInt(radicado)
      );
      res.status(200).json(consultantion);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);
//Ruta para crear consulta
router.post(
  '/',
  validatorHandler(createConsultationSchema, 'body'),
  async (req, res) => {
    try {
      const consultantionData = req.body;
      const consultantion = await service.addConsultation(consultantionData);
      res.status(200).json(consultantion);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);
//Ruta para editar consulta
router.patch(
  '/:radicado',
  validatorHandler(getConsultationSchema, 'params'),
  validatorHandler(updateConsultationSchema, 'body'),
  async (req, res) => {
    try {
      const { radicado } = req.params;
      const consultantionData = req.body;
      const consultantion = await service.editconsultation(
        parseInt(radicado),
        consultantionData
      );
      res.status(200).json(consultantion);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);
//Eliminar consulta
router.delete(
  '/:radicado',
  validatorHandler(getConsultationSchema, 'params'),
  async (req, res) => {
    try {
      const { radicado } = req.params;
      const consultantion = await service.deleteconsultation(
        parseInt(radicado)
      );
      res.status(200).json(consultantion);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);
module.exports = router;
