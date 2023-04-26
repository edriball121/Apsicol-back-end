//llamar a express constructor
const express = require('express');
//llamar al servicio
const adminService = require('./../services/admin.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createAdminSchema,
  getAdminSchema,
  updateAdminSchema,
} = require('./../schemas/admin.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new adminService();

//Ruta para obtener administrador
router.get('/', async (req, res) => {
  try {
    const admin = await service.getAdmin();
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear administrador
router.post('/',
validatorHandler(createAdminSchema, 'body'),
async (req, res) => {
  try {
    const adminData = req.body;
    const admin = await service.addAdmin(adminData);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar administrador
router.patch('/:cedula',
validatorHandler(getAdminSchema, 'params'),
validatorHandler(updateAdminSchema, 'body'),
async (req, res) => {
  try {
    const {cedula} = req.params;
    const adminData = req.body;
    const admin = await service.editAdmin(cedula, adminData);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar administrador
router.delete('/:cedula',
validatorHandler(getAdminSchema, 'params'),
async (req, res) =>{
   try {
    const {cedula} = req.params;
    const admin = await service.deleteAdmin(cedula);
    res.status(200).json(admin)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
