// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editAdSchema = Joi.object({
    category_id: Joi.number().max(10).allow('').messages(joiErrorMessages),
    package_id: Joi.number().max(10).allow(null, '').messages(joiErrorMessages),
    address: Joi.string().optional().allow('').messages(joiErrorMessages),
    city: Joi.string().optional().allow('').messages(joiErrorMessages),
    provincia_id: Joi.number()
        .optional()
        .allow('')
        .max(60)
        .messages(joiErrorMessages),
    title: Joi.string().max(200).allow('').messages(joiErrorMessages),
    description: Joi.string().max(2000).allow('').messages(joiErrorMessages),
    link: Joi.string().uri().optional().allow('').messages(joiErrorMessages),
    contact_email: Joi.string()
        .email()
        .allow('')
        .optional()
        .messages(joiErrorMessages),
    contact_phone: Joi.number()
        .min(0)
        .allow('')
        .optional()
        .messages(joiErrorMessages),
});

export default editAdSchema;
