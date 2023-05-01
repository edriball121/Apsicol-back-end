//llamar a express constructor
const express = require('express');
//llamar al servicio
const companyService = require('./../services/company.service');
//llamar middlewares
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCompanySchema,
  getCompanySchema,
  updateCompanySchema,
} = require('./../schemas/company.schema');
//llamar el router
const router = express.Router();
//crear una instancia de servicio
const service = new companyService();

//Ruta para obtener empresa
router.get('/', async (req, res) => {
  try {
    const company = await service.getCompany();
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para crear empresa
router.post('/',
validatorHandler(createCompanySchema, 'body'),
async (req, res) => {
  try {
    const companyData = req.body;
    const company = await service.addCompany(companyData);
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Ruta para editar empresa
router.patch('/:id',
validatorHandler(getCompanySchema, 'params'),
validatorHandler(updateCompanySchema, 'body'),
async (req, res) => {
  try {
    const {id} = req.params;
    const companyData = req.body;
    const company = await service.editCompany(id, companyData);
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
//Eliminar administrador
router.delete('/:id',
validatorHandler(getCompanySchema, 'params'),
async (req, res) =>{
   try {
    const {id} = req.params;
    const company = await service.deleteCompany(id);
    res.status(200).json(company)
   } catch (error) {
    res.status(404).json({ error: error });
   }
});
module.exports = router;
