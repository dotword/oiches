// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createAgenciaSchema = Joi.object({
    nombre: Joi.string().required().messages(joiErrorMessages),
    descripcion: Joi.string().max(2000).required().messages(joiErrorMessages),
    provincia: Joi.number().max(50).required().messages(joiErrorMessages),
    web: Joi.string().uri().required().messages(joiErrorMessages),
});

export default createAgenciaSchema;
