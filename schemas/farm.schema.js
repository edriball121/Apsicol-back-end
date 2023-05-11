//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const fin_codigo = Joi.number();
const fin_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const fin_tamanno = Joi.number();
const fin_direccion = Joi.string().min(5).max(45);
const fin_foto = Joi.string().min(6).max(120);
const fin_productos = Joi.string().min(10).max(150).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);
const fin_telefono = Joi.string().max(10).regex(/^[0-9-]+$/);
const fin_descripcion = Joi.string().min(5).max(1000);

//Regla para crear granjero
const createFarmSchema = Joi.object({
  fin_codigo: fin_codigo.required(),
  fin_nombre: fin_nombre.required(),
  fin_tamanno: fin_tamanno.required(),
  fin_direccion: fin_direccion.required(),
  fin_foto: fin_foto.required(),
  fin_productos: fin_productos.required(),
  fin_telefono: fin_telefono.required(),
  fin_descripcion: fin_descripcion.required(),
});

//Regla para editar granjero
const updateFarmSchema = Joi.object({
  fin_codigo: fin_codigo,
  fin_nombre: fin_nombre,
  fin_tamanno: fin_tamanno,
  fin_direccion: fin_direccion,
  fin_foto: fin_foto,
  fin_productos: fin_productos,
  fin_telefono: fin_telefono,
  fin_descripcion: fin_descripcion,
});

//Regla para eliminar y seleccionar granjero
const getFarmSchema = Joi.object({
  id: fin_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createFarmSchema, updateFarmSchema, getFarmSchema}
