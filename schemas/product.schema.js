//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const pro_codigo = Joi.number();
const pro_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);
const pro_descripcion = Joi.string().min(2).max(1000).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);
const pro_precio = Joi.string().max(45);
const pro_estado = Joi.string().max(45);
const pro_cantidad = Joi.string().max(45);
const pro_terminos_y_condiciones = Joi.string().max(1000);
const pro_foto = Joi.string();

//Regla para crear producto
const createProductSchema = Joi.object({
  pro_codigo: pro_codigo,
  pro_nombre: pro_nombre.required(),
  pro_descripcion: pro_descripcion.required(),
  pro_precio: pro_precio.required(),
  pro_estado: pro_estado.required(),
  pro_cantidad: pro_cantidad.required(),
  pro_terminos_y_condiciones: pro_terminos_y_condiciones.required(),
  pro_foto: pro_foto.required(),
});

//Regla para editar producto
const updateProductSchema = Joi.object({
  pro_codigo: pro_codigo,
  pro_nombre: pro_nombre,
  pro_descripcion: pro_descripcion,
  pro_precio: pro_precio,
  pro_estado: pro_estado,
  pro_cantidad: pro_cantidad,
  pro_terminos_y_condiciones: pro_terminos_y_condiciones,
  pro_foto: pro_foto,
});

//Regla para eliminar y seleccionar granjero
const getProductSchema = Joi.object({
  id: pro_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createProductSchema, updateProductSchema, getProductSchema}
