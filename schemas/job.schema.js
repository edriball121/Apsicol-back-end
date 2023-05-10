//Importar la libreria de joi
const Joi = require("joi");

//crear schema para cada uno de los campos
const emp_codigo = Joi.number();
const emp_nombre = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:" ]+$/);
const emp_termnos_y_condiciones = Joi.string().min(2).max(45).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);
const emp_fecha_creacion = Joi.string().regex(/^[0-9-]+$/);
const emp_descripcion = Joi.string().min(2).max(1000).regex(/^[a-zA-Z,.;:ñÑáéíóúÁÉÍÓÚ\s\-" ]+$/);


//Regla para crear trabajo
const createJobSchema = Joi.object({
  emp_codigo: emp_codigo.required(),
  emp_nombre: emp_nombre.required(),
  emp_termnos_y_condiciones: emp_termnos_y_condiciones.required(),
  emp_fecha_creacion: emp_fecha_creacion.required(),
  emp_descripcion: emp_descripcion.required(),
});

//Regla para editar trabajo
const updateJobSchema = Joi.object({
  emp_codigo: emp_codigo,
  emp_nombre: emp_nombre,
  emp_termnos_y_condiciones: emp_termnos_y_condiciones,
  emp_fecha_creacion: emp_fecha_creacion,
  emp_descripcion: emp_descripcion,
});

//Regla para eliminar y seleccionar trabajo
const getJobSchema = Joi.object({
  id: emp_codigo.required()
});

//Exportar modulo con sus funciones
module.exports = {createJobSchema, updateJobSchema, getJobSchema}
