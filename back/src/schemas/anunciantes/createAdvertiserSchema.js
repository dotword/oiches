// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createAdvertiserSchema = Joi.object({
    nombreEmpresa: Joi.string().required().messages(joiErrorMessages),
    nombreContacto: Joi.string()
        .allow('')
        .optional()
        .messages(joiErrorMessages),
    direccion: Joi.string().required().messages(joiErrorMessages),
    ciudad: Joi.string().required().messages(joiErrorMessages),
    codigoPostal: Joi.string().required().messages(joiErrorMessages),
    telefono: Joi.number()
        .min(0)
        .allow('')
        .optional()
        .messages(joiErrorMessages),
    cif: Joi.string().required().messages(joiErrorMessages),
});

export default createAdvertiserSchema;
