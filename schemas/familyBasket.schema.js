//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const cta_codigo = Joi.number();
const cta_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const cta_precio = Joi.number();
const cta_fecha = Joi.string().regex(/^[0-9-]+$/);
const cta_ciudad = Joi.string().max(45).regex(/^[a-zA-Z ]+$/);
const fk_cta_adm_cedula = Joi.string().max(11);
const fk_cta_ciu_codigo = Joi.number();

//Regla para crear producto canasta familiar
const createFamilyBasketSchema = Joi.object({
  cta_codigo: cta_codigo,
  cta_nombre: cta_nombre.required(),
  cta_precio: cta_precio.required(),
  cta_fecha: cta_fecha.required(),
  cta_ciudad: cta_ciudad.required(),
  fk_cta_adm_cedula: fk_cta_adm_cedula.required(),
  fk_cta_ciu_codigo: fk_cta_ciu_codigo.required(),
});

//Regla para editar producto canasta familiar
const updateFamilyBasketSchema = Joi.object({
  cta_codigo: cta_codigo,
  cta_nombre: cta_nombre,
  cta_precio: cta_precio,
  cta_fecha: cta_fecha,
  cta_ciudad: cta_ciudad,
  fk_cta_adm_cedula: fk_cta_adm_cedula,
  fk_cta_ciu_codigo: fk_cta_ciu_codigo,
});

//Regla para eliminar y seleccionar granjero
const getFamilyBasketSchema = Joi.object({
  id: cta_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createFamilyBasketSchema, updateFamilyBasketSchema, getFamilyBasketSchema}
