// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editConciertoSchema = Joi.object({
    title: Joi.string().allow('').min(10).max(255).messages(joiErrorMessages),
    fecha: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .messages({
            'string.empty': 'El campo "fecha" no debe estar vacío',
            'string.pattern.base': 'La fecha debe estar en formato YYYY-MM-DD',
        }),
    hora: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
        .messages(joiErrorMessages),
    precioAnticipada: Joi.alternatives()
        .try(Joi.number().positive().precision(2), Joi.valid('', 'null', null))
        .messages(joiErrorMessages),
    precio: Joi.alternatives()
        .try(Joi.number().positive().precision(2), Joi.valid('', 'null', null))
        .messages(joiErrorMessages),
    otroTipoEntrada: Joi.string().allow('').max(100).messages(joiErrorMessages),
    description: Joi.string()
        .allow('')
        .min(10)
        .max(5000)
        .messages(joiErrorMessages),
    link: Joi.string().uri().messages(joiErrorMessages),
    salaLink: Joi.string().allow('').messages(joiErrorMessages),
});

export default editConciertoSchema;
