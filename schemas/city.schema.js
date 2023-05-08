//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const ciu_codigo = Joi.number();
const ciu_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:" ]+$/);
const ciu_estado = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:" ]+$/);

//Regla para crear ciudad
const createCitySchema = Joi.object({
  ciu_codigo: ciu_codigo.required(),
  ciu_nombre: ciu_nombre.required(),
  ciu_estado: ciu_estado.required(),
});

//Regla para editar ciudad
const updateCitySchema = Joi.object({
  ciu_codigo: ciu_codigo,
  ciu_nombre: ciu_nombre,
  ciu_estado: ciu_estado,
});

//Regla para eliminar y seleccionar ciudad
const getCitySchema = Joi.object({
  id: ciu_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createCitySchema, updateCitySchema, getCitySchema}
