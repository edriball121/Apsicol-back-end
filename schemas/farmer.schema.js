//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const gra_cedula = Joi.string().max(11);
const gra_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const gra_apellido = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const gra_password = Joi.string().max(255);
const gra_telefono = Joi.string().min(6).max(11);
const gra_email = Joi.string().max(45).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/i);
const gra_direccion = Joi.string().min(5).max(45);
const gra_fecha_nacimiento = Joi.string();
const gra_fecha_creacion = Joi.string().regex(/^[0-9-]+$/);
const gra_perfil_laboral = Joi.string().max(45).regex(/^[a-zA-Z,.;:" ]+$/);

//Regla para crear granjero
const createFarmerSchema = Joi.object({
  gra_cedula: gra_cedula.required(),
  gra_nombre: gra_nombre.required(),
  gra_apellido: gra_apellido.required(),
  gra_password: gra_password.required(),
  gra_telefono: gra_telefono.required(),
  gra_email: gra_email.required(),
  gra_direccion: gra_direccion.required(),
  gra_fecha_nacimiento: gra_fecha_nacimiento.required(),
  gra_fecha_creacion: gra_fecha_creacion.required(),
  gra_perfil_laboral: gra_perfil_laboral.required(),
});

//Regla para editar granjero
const updateFarmerSchema = Joi.object({
  gra_cedula: gra_cedula,
  gra_nombre: gra_nombre,
  gra_apellido: gra_apellido,
  gra_password: gra_password,
  gra_telefono: gra_telefono,
  gra_email: gra_email,
  gra_direccion: gra_direccion,
  gra_fecha_nacimiento: gra_fecha_nacimiento,
  gra_fecha_creacion: gra_fecha_creacion,
  gra_perfil_laboral: gra_perfil_laboral
});

//Regla para eliminar y seleccionar granjero
const getFarmerSchema = Joi.object({
  cedula: gra_cedula.required()
});

//Exportar modulo con sus funciones
module.exports = {createFarmerSchema, updateFarmerSchema, getFarmerSchema}
