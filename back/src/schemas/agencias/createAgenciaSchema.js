// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createAgenciaSchema = Joi.object({
    nombre: Joi.string().required().messages(joiErrorMessages),
    provincia: Joi.number().max(60).required().messages(joiErrorMessages),
    descripcion: Joi.string().max(2000).required().messages(joiErrorMessages),
    web: Joi.string().uri().required().messages(joiErrorMessages),
    especialidad: Joi.alternatives()
        .try(
            Joi.number().integer().min(1), // Acepta un solo número
            Joi.array().items(Joi.number().integer().min(1)) // O un array de números
        )
        .required()
        .messages(joiErrorMessages),
});

export default createAgenciaSchema;
