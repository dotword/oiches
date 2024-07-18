// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// fecha, hora, nombre

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newUserSchema = Joi.object({
    fecha: Joi.date().required().messages(joiErrorMessages),
    horaInicio: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
            'string.pattern.base':
                'El campo de hora debe estar en formato HH:mm',
        }),
    horaFin: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
            'string.pattern.base':
                'El campo de hora debe estar en formato HH:mm',
        }),
});

export default newUserSchema;
