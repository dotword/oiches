// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editAgenciaSchema = Joi.object({
    nombre: Joi.string().messages(joiErrorMessages),
    provincia: Joi.number().max(50).messages(joiErrorMessages),
    descripcion: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    web: Joi.string().uri().allow(null, '').messages(joiErrorMessages),
    especialidad: Joi.alternatives()
        .try(
            Joi.number().integer().min(1), // Acepta un solo número
            Joi.array().items(Joi.number().integer().min(1)) // O un array de números
        )
        .allow(null, '')
        .messages(joiErrorMessages),
});

export default editAgenciaSchema;
