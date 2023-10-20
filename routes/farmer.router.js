//llamar a express constructor
const express = require('express');
//llamar a jwt
const jwt = require('jsonwebtoken');
//llamar al servicio
const farmerService = require('./../services/farmer.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
//llamar a node mailer
const nodemailer = require('nodemailer');
//ENV
require('dotenv').config();
const {
  createFarmerSchema,
  getFarmerSchema,
  updateFarmerSchema,
} = require('./../schemas/farmer.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new farmerService();

//login admin JWT
router.post('/login', async (req, res) => {
  try {
    const farmerData = req.body;
    const farmer = await service.loginFarmer(farmerData);
    const data = JSON.stringify(farmer);
    const token = jwt.sign(data, 'admin');
    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

//ruta recover password
router.post('/recover-pw', async (req, res) => {
  try {
    const farmerData = req.body;
    const { farmer, newPassword } = await service.recoveryPassword(farmerData);

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: farmer.gra_email,
      subject: 'Recuperar contraseña ✔',
      html: `<b>Tu nueva contraseña es: ${newPassword}</b>`,
    });

    res.status(200).json({ data: 'Contraseña enviada exitosamente' });
  } catch (error) {
    if (error === 'usuario o email invalidos') {
      res.status(400).json({ error: 'Usuario o email inválidos' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

//crear transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.KEY_APP,
  },
});

//Ruta para obtener granjeros
router.get('/', async (req, res) => {
  try {
    const farmer = await service.getFarmer();
    res.status(200).json(farmer);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear granjero
router.post(
  '/',
  validatorHandler(createFarmerSchema, 'body'),
  async (req, res) => {
    try {
      const farmerData = req.body;
      const farmer = await service.addFarmer(farmerData);
      res.status(200).json(farmer);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);
//Ruta para editar granjero
router.patch(
  '/:cedula',
  validatorHandler(getFarmerSchema, 'params'),
  validatorHandler(updateFarmerSchema, 'body'),
  async (req, res) => {
    try {
      const { cedula } = req.params;
      const farmerData = req.body;
      const farmer = await service.editFarmer(cedula, farmerData);
      res.status(200).json(farmer);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);
//Eliminar granjero
router.delete(
  '/:cedula',
  validatorHandler(getFarmerSchema, 'params'),
  async (req, res) => {
    try {
      const { cedula } = req.params;
      const farmer = await service.deleteFarmer(cedula);
      res.status(200).json(farmer);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);
module.exports = router;
