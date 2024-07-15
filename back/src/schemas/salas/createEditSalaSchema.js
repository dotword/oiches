// Importamos joi.
import Joi from 'joi';
import imgSchema from '../imgSchema.js';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createEditSalaSchema = Joi.object({
    nombre: Joi.string().messages(joiErrorMessages),
    provincia: Joi.number().max(50).messages(joiErrorMessages),
    direccion: Joi.string().messages(joiErrorMessages),
    capacidad: Joi.number().positive().integer().messages(joiErrorMessages),
    equipamiento: Joi.string().max(2000).messages(joiErrorMessages),
    generos: Joi.number().positive().integer().messages(joiErrorMessages),
    condiciones: Joi.string().max(2000).messages(joiErrorMessages),
    descripcion: Joi.string().max(2000).messages(joiErrorMessages),
    precios: Joi.number().min(0).messages(joiErrorMessages),
    email: Joi.string().email().messages(joiErrorMessages),
    photo: imgSchema.optional(),
    deletePhoto: Joi.string().messages(joiErrorMessages),
});

export default createEditSalaSchema;
