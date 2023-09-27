//Importar la libreria de joi
const Joi = require("joi");

/*
Este schema se usara para validar tanto la gestion de agricola como pecuario
*/
//crear schema para cada uno de los campos
const Ape_codigo = Joi.number();
const Ape_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z ]+$/);
const Ape_tipo = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:" ]+$/);
const Ape_fecha_creacion = Joi.string().regex(/^[0-9-]+$/);
const Ape_Foto = Joi.string();
const Ape_Descripcion = Joi.string().max(1000).regex(/^[a-zA-Z,.;:" ]+$/);

//Regla para crear especie agricola
const createFarmingSchema = Joi.object({
  Ape_codigo: Ape_codigo,
  Ape_nombre: Ape_nombre.required(),
  Ape_tipo: Ape_tipo.required(),
  Ape_fecha_creacion: Ape_fecha_creacion.required(),
  Ape_Foto: Ape_Foto.required(),
  Ape_Descripcion: Ape_Descripcion.required(),
});

//Regla para editar especie agricola
const updateFarmingSchema = Joi.object({
  Ape_codigo: Ape_codigo,
  Ape_nombre: Ape_nombre,
  Ape_tipo: Ape_tipo,
  Ape_fecha_creacion: Ape_fecha_creacion,
  Ape_Foto: Ape_Foto,
  Ape_Descripcion: Ape_Descripcion,
});

//Regla para eliminar y seleccionar especie agricola
const getFarmingSchema = Joi.object({
  id: Ape_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createFarmingSchema, updateFarmingSchema, getFarmingSchema}
