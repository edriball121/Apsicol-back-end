//llamar a express constructor
const express = require('express');
//llamar a jwt
const jwt = require('jsonwebtoken');
//llamar al servicio
const consultantService = require('./../services/consultant.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createConsultantSchema,
  getConsultantSchema,
  updateConsultantSchema,
} = require('./../schemas/consultant.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new consultantService();

//login admin JWT
router.post('/login', async (req, res) => {
  try {
    const consultantData = req.body;
    const consultant = await service.loginConsultant(consultantData);
    const data = JSON.stringify(consultant);
    const token = jwt.sign(data, 'admin');
    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

//Ruta para obtener consultor
router.get('/', async (req, res) => {
  try {
    const consultant = await service.getConsultant();
    res.status(200).json(consultant);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear consultor
router.post('/',
  validatorHandler(createConsultantSchema, 'body'),
  async (req, res) => {
    try {
      const consultantData = req.body;
      const consultant = await service.addConsultant(consultantData);
      res.status(200).json(consultant);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  });
//Ruta para editar consultor
router.patch('/:cedula',
  validatorHandler(getConsultantSchema, 'params'),
  validatorHandler(updateConsultantSchema, 'body'),
  async (req, res) => {
    try {
      const { cedula } = req.params;
      const consultantData = req.body;
      const consultant = await service.editConsultant(cedula, consultantData);
      res.status(200).json(consultant);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  });
//Eliminar granjero
router.delete('/:cedula',
  validatorHandler(getConsultantSchema, 'params'),
  async (req, res) => {
    try {
      const { cedula } = req.params;
      const consultant = await service.deleteConsultant(cedula);
      res.status(200).json(consultant)
    } catch (error) {
      res.status(404).json({ error: error });
    }
  });
module.exports = router;
