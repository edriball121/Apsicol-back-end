//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const not_codigo = Joi.number();
const not_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:" ]+$/);
const not_descripcion = Joi.string().min(2).max(100).regex(/^[a-zA-Z,.;:" ]+$/);
const not_foto = Joi.string();
const not_fecha_creacion = Joi.string().regex(/^[0-9-]+$/);
const not_url = Joi.string();
const not_subtitulo = Joi.string()
const fk_not_adm_cedula = Joi.string().max(11);

//Regla para crear noticia
const createNewsSchema = Joi.object({
  not_codigo: not_codigo.required(),
  not_nombre: not_nombre.required(),
  not_descripcion: not_descripcion.required(),
  not_foto: not_foto.required(),
  not_fecha_creacion: not_fecha_creacion.required(),
  not_url: not_url.required(),
  not_subtitulo: not_subtitulo.required(),
  fk_not_adm_cedula: fk_not_adm_cedula.required(),
});

//Regla para editar noticia
const updateNewsSchema = Joi.object({
  not_codigo: not_codigo,
  not_nombre: not_nombre,
  not_descripcion: not_descripcion,
  not_foto: not_foto,
  not_fecha_creacion: not_fecha_creacion,
  not_url: not_url,
  not_subtitulo:not_subtitulo,
  fk_not_adm_cedula: fk_not_adm_cedula,
});

//Regla para eliminar y seleccionar noticia
const getNewsSchema = Joi.object({
  id: not_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createNewsSchema, updateNewsSchema, getNewsSchema}
