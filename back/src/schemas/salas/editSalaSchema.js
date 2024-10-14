// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editSalaSchema = Joi.object({
    nombre: Joi.string().messages(joiErrorMessages),
    provincia: Joi.number().max(50).messages(joiErrorMessages),
    direccion: Joi.string().messages(joiErrorMessages),
    capacidad: Joi.number().min(0).allow(null, '').messages(joiErrorMessages),
    equipamiento: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    generos: Joi.number().allow('').messages(joiErrorMessages),
    condiciones: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    descripcion: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    web: Joi.string().uri().allow(null, '').messages(joiErrorMessages),
    precios: Joi.number().min(0).allow(null, '').messages(joiErrorMessages),
    horaReservasStart: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .allow(null, '')
        .messages({
            'string.pattern.base':
                'El campo de hora debe estar en formato HH:mm',
        }),
    horaReservasEnd: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .allow('')
        .messages({
            'string.pattern.base':
                'El campo de hora debe estar en formato HH:mm',
        }),
});

export default editSalaSchema;
