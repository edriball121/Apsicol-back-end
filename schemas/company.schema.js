//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const emp_codigo = Joi.number();
const emp_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const emp_descripcion = Joi.string().min(2).max(1000).regex(/^[a-zA-Z,.;:" ]+$/);
const emp_telefono = Joi.string().min(6).max(11);
const emp_foto = Joi.string();
const emp_subtitulo = Joi.string().max(45);


//Regla para crear granjero
const createCompanySchema = Joi.object({
  emp_codigo : emp_codigo,
  emp_nombre: emp_nombre.required(),
  emp_descripcion: emp_descripcion.required(),
  emp_telefono: emp_telefono.required(),
  emp_foto: emp_foto.required(),
  emp_subtitulo: emp_subtitulo.required(),
});

//Regla para editar granjero
const updateCompanySchema = Joi.object({
  emp_codigo : emp_codigo,
  emp_nombre: emp_nombre,
  emp_descripcion: emp_descripcion,
  emp_telefono: emp_telefono,
  emp_foto: emp_foto,
  emp_subtitulo: emp_subtitulo,
});

//Regla para eliminar y seleccionar granjero
const getCompanySchema = Joi.object({
  id: emp_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createCompanySchema, updateCompanySchema, getCompanySchema}
