//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const con_cedula = Joi.string().max(15);
const con_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const con_apellido = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const con_password = Joi.string().max(45);
const con_telefono = Joi.string().min(6).max(45);
const con_email = Joi.string().max(45).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/i);
const con_direccion = Joi.string().min(5).max(45);
const con_fecha_nacimiento = Joi.string();
const con_fecha_creacion = Joi.string().regex(/^[0-9-]+$/);
const con_profesion = Joi.string().regex(/^[a-zA-Z,.;:" ]+$/);
const con_annos_experiencia = Joi.number();

//Regla para crear granjero
const createConsultantSchema = Joi.object({
  con_cedula: con_cedula.required(),
  con_nombre: con_nombre.required(),
  con_apellido: con_apellido.required(),
  con_password: con_password.required(),
  con_telefono: con_telefono.required(),
  con_email: con_email.required(),
  con_direccion: con_direccion.required(),
  con_fecha_nacimiento: con_fecha_nacimiento.required(),
  con_fecha_creacion: con_fecha_creacion.required(),
  con_profesion: con_profesion.required(),
  con_annos_experiencia : con_annos_experiencia.required(),
});

//Regla para editar granjero
const updateConsultantSchema = Joi.object({
  con_cedula: con_cedula,
  con_nombre: con_nombre,
  con_apellido: con_apellido,
  con_password: con_password,
  con_telefono: con_telefono,
  con_email: con_email,
  con_direccion: con_direccion,
  con_fecha_nacimiento: con_fecha_nacimiento,
  con_fecha_creacion: con_fecha_creacion,
  con_profesion: con_profesion,
  con_annos_experiencia : con_annos_experiencia,
});

//Regla para eliminar y seleccionar granjero
const getConsultantSchema = Joi.object({
  cedula: con_cedula.required()
});

//Exportar modulo con sus funciones
module.exports = {createConsultantSchema, updateConsultantSchema, getConsultantSchema}
