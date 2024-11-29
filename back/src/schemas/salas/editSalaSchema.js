// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editSalaSchema = Joi.object({
    nombre: Joi.string().messages(joiErrorMessages),
    provincia: Joi.number().max(50).messages(joiErrorMessages),
    direccion: Joi.string().messages(joiErrorMessages),
    ciudad: Joi.string().messages(joiErrorMessages),
    capacidad: Joi.number().min(0).allow(null, '').messages(joiErrorMessages),
    equipamiento: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    generos: Joi.number().allow('').messages(joiErrorMessages),
    condiciones: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    descripcion: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    web: Joi.string().uri().allow(null, '').messages(joiErrorMessages),
    precios: Joi.number().min(0).allow(null, '').messages(joiErrorMessages),
});

export default editSalaSchema;
