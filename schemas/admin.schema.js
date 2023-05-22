//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const adm_cedula = Joi.string().max(11);
const adm_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const adm_apellido = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const adm_password = Joi.string().max(255);
const adm_telefono = Joi.string().min(6).max(11);
const adm_email = Joi.string().max(45).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/i);
const adm_direccion = Joi.string().min(5).max(45);
const adm_fecha_nacimiento = Joi.string();
const adm_fecha_creacion = Joi.string().regex(/^[0-9-]+$/);
const adm_rol = Joi.string().max(45).regex(/^[a-zA-Z,.;:" ]+$/);
const rol = Joi.string().max(11).regex(/^[a-zA-Z ]+$/);

//Regla para crear granjero
const createAdminSchema = Joi.object({
  adm_cedula: adm_cedula.required(),
  adm_nombre: adm_nombre.required(),
  adm_apellido: adm_apellido.required(),
  adm_password: adm_password.required(),
  adm_telefono: adm_telefono.required(),
  adm_email: adm_email.required(),
  adm_direccion: adm_direccion.required(),
  adm_fecha_nacimiento: adm_fecha_nacimiento.required(),
  adm_fecha_creacion: adm_fecha_creacion.required(),
  adm_rol: adm_rol.required(),
  rol: rol.required()
});


//Regla para editar granjero
const updateAdminSchema = Joi.object({
  adm_cedula: adm_cedula,
  adm_nombre: adm_nombre,
  adm_apellido: adm_apellido,
  adm_password: adm_password,
  adm_telefono: adm_telefono,
  adm_email: adm_email,
  adm_direccion: adm_direccion,
  adm_fecha_nacimiento: adm_fecha_nacimiento,
  adm_fecha_creacion: adm_fecha_creacion,
  adm_rol: adm_rol,
  rol:rol,
});

//Regla para eliminar y seleccionar granjero
const getAdminSchema = Joi.object({
  cedula: adm_cedula.required()
});

//Exportar modulo con sus funciones
module.exports = {createAdminSchema, updateAdminSchema, getAdminSchema}
