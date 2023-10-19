//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const ser_codigo = Joi.number();
const ser_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);
const ser_descripcion = Joi.string().min(2).max(1000).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);
const ser_valor = Joi.string().max(45).regex(/^[0-9]+$/);
const ser_foto = Joi.string();
const fk_ser_emp_codigo = Joi.number();

//Regla para crear servicio
const createServicesSchema = Joi.object({
  ser_codigo: ser_codigo,
  ser_nombre: ser_nombre.required(),
  ser_descripcion: ser_descripcion.required(),
  ser_valor: ser_valor.required(),
  ser_foto: ser_foto.required(),
  fk_ser_emp_codigo: fk_ser_emp_codigo.required(),
});

//Regla para editar servicio
const updateServicesSchema = Joi.object({
  ser_codigo: ser_codigo,
  ser_nombre: ser_nombre,
  ser_descripcion: ser_descripcion,
  ser_valor: ser_valor,
  ser_foto: ser_foto,
  fk_ser_emp_codigo: fk_ser_emp_codigo,
});

//Regla para eliminar y seleccionar granjero
const getServicesSchema = Joi.object({
  id: ser_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createServicesSchema, updateServicesSchema, getServicesSchema}
