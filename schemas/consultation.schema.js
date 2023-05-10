//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const con_radicado = Joi.number();
const con_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const con_tipo_consulta = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:" ]+$/);
const con_descripcion = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:" ]+$/);
const con_fecha = Joi.string().regex(/^[0-9-]+$/);
const con_estado = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const con_calificacion = Joi.string().min(2).max(45).regex(/^[a-zA-Z0-9- ]+$/);
const con_fecha_finalizacion = Joi.string().regex(/^[0-9-]+$/);
const fk_con_gra_cedula = Joi.string().max(11);

//Regla para crear consulta
const createConsultationSchema = Joi.object({
  con_radicado: con_radicado.required(),
  con_nombre: con_nombre.required(),
  con_tipo_consulta: con_tipo_consulta.required(),
  con_descripcion: con_descripcion.required(),
  con_fecha: con_fecha.required(),
  con_estado: con_estado.required(),
  con_calificacion: con_calificacion.required(),
  con_fecha_finalizacion: con_fecha_finalizacion.required(),
  fk_con_gra_cedula: fk_con_gra_cedula.required(),
});

//Regla para editar consulta
const updateConsultationSchema = Joi.object({
  con_radicado: con_radicado,
  con_nombre: con_nombre,
  con_tipo_consulta: con_tipo_consulta,
  con_descripcion: con_descripcion,
  con_fecha: con_fecha,
  con_estado: con_estado,
  con_calificacion: con_calificacion,
  con_fecha_finalizacion: con_fecha_finalizacion,
  fk_con_gra_cedula: fk_con_gra_cedula,
});

//Regla para eliminar y seleccionar consulta
const getConsultationSchema = Joi.object({
  radicado: con_radicado.required()
});

//Exportar modulo con sus funciones
module.exports = {createConsultationSchema,updateConsultationSchema,getConsultationSchema}
