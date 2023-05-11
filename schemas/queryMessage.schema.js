//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const mco_codigo = Joi.number();
const mco_fecha = Joi.string().regex(/^[0-9-]+$/);
const mco_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const mco_descripcion = Joi.string().max(255).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);
const mco_tipo = Joi.string().min(2).max(45);
const fk_mco_con_cedula = Joi.string().max(11).regex(/^[0-9-]+$/);
const fk_mco_gra_cedula = Joi.string().max(11).regex(/^[0-9-]+$/);
const fk_mco_con_radicado = Joi.number();

//Regla para crear mensaje consulta
const createQueryMessageSchema = Joi.object({
  mco_codigo: mco_codigo.required(),
  mco_fecha: mco_fecha.required(),
  mco_nombre: mco_nombre.required(),
  mco_descripcion: mco_descripcion.required(),
  mco_tipo: mco_tipo.required(),
  fk_mco_con_cedula: fk_mco_con_cedula.required(),
  fk_mco_gra_cedula: fk_mco_gra_cedula.required(),
  fk_mco_con_radicado: fk_mco_con_radicado.required(),
});

//Regla para editar mensaje consulta
const updateQueryMessageSchema = Joi.object({
  mco_codigo: mco_codigo,
  mco_fecha: mco_fecha,
  mco_nombre: mco_nombre,
  mco_descripcion: mco_descripcion,
  mco_tipo: mco_tipo,
  fk_mco_con_cedula: fk_mco_con_cedula,
  fk_mco_gra_cedula: fk_mco_gra_cedula,
  fk_mco_con_radicado: fk_mco_con_radicado,
});

//Regla para eliminar y seleccionar mensaje consulta
const getQueryMessageSchema = Joi.object({
  id: mco_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createQueryMessageSchema, updateQueryMessageSchema, getQueryMessageSchema}
