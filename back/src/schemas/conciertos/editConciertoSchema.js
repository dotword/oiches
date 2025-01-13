// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editConciertoSchema = Joi.object({
    fecha: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .messages({
            'string.empty': 'El campo "fecha" no debe estar vacío',
            'string.pattern.base': 'La fecha debe estar en formato YYYY-MM-DD',
        }),
    hora: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
        .messages(joiErrorMessages),
    precio: Joi.number().positive().precision(2).messages(joiErrorMessages),
    link: Joi.string().uri().messages(joiErrorMessages),
});

export default editConciertoSchema;
