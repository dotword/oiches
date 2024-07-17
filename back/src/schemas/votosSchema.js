// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from './joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const votosSchema = Joi.object({
    voto: Joi.number().min(1).max(5).positive().integer().required().messages({
        'number.min': 'El valor debe ser entre 1 y 5',
        'number.max': 'El valor debe ser entre 1 y 5',
    }),
    comment: Joi.string().max(500).messages(joiErrorMessages),
});

export default votosSchema;
