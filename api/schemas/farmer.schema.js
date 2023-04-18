//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const gra_cedula = Joi.number().integer().max(11);
const gra_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const gra_apellido = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const gra_password = Joi.string().max(45);
const gra_telefono = Joi.number().integer().min(8).max(45);
const gra_email = Joi.string().max(45).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/i);
const gra_direccion = Joi.string().min(5).max(45);
const gra_fecha_nacimiento = Joi.string();
const gra_fecha_creacion = Joi.string().regex(/^[0-9-]+$/);
const gra_perfil_laboral = Joi.string().regex(/^[a-zA-Z,.;:" ]+$/);

//Regla para crear granjero
const createFarmerSchema = Joi.object({
  graCedula: gra_cedula.required(),
  graNombre: gra_nombre.required(),
  graApellido: gra_apellido.required(),
  gra_password: gra_password.required(),
  graTelefono: gra_telefono.required(),
  graEmail: gra_email.required(),
  graDireccion: gra_direccion.required(),
  graFechaNacimiento: gra_fecha_nacimiento.required(),
  graFechaCreacion: gra_fecha_creacion.required(),
  graPerfilLaboral: gra_perfil_laboral.required(),
});

//Regla para editar granjero
const updateFarmerSchema = Joi.object({
  graCedula: gra_cedula.required(),
  graNombre: gra_nombre.required(),
  graApellido: gra_apellido.required(),
  gra_password: gra_password.required(),
  graTelefono: gra_telefono.required(),
  graEmail: gra_email.required(),
  graDireccion: gra_direccion.required(),
  graFechaNacimiento: gra_fecha_nacimiento.required(),
  graFechaCreacion: gra_fecha_creacion.required(),
  graPerfilLaboral: gra_perfil_laboral.required(),
});

//Regla para eliminar y seleccionar granjero
const getFarmerSchema = Joi.object({
  graCedula: gra_cedula.required(),
});

//Exportar modulo con sus funciones
module.exports = {createFarmerSchema, updateFarmerSchema, getFarmerSchema}

