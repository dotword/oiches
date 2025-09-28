// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createAdSchema = Joi.object({
    category_id: Joi.number().max(10).required().messages(joiErrorMessages),
    package_id: Joi.number().max(10).required().messages(joiErrorMessages),
    address: Joi.string().optional().messages(joiErrorMessages),
    city: Joi.string().optional().messages(joiErrorMessages),
    provincia_id: Joi.number().optional().max(60).messages(joiErrorMessages),
    title: Joi.string().max(200).required().messages(joiErrorMessages),
    description: Joi.string().max(2000).messages(joiErrorMessages),
    link: Joi.string().uri().optional().messages(joiErrorMessages),
    contact_email: Joi.string().email().optional().messages(joiErrorMessages),
    contact_phone: Joi.number().min(0).optional().messages(joiErrorMessages),
    image: Joi.object({
        name: Joi.string().required(),
        mimetype: Joi.string()
            .valid('image/jpeg', 'image/jpg', 'image/png', 'image/webp')
            .required()
            .messages({
                'any.only':
                    'El tipo de archivo debe ser uno de los siguientes: jpeg, jpg, png, webp',
            }),
        size: Joi.number().max(3000000).required().messages({
            'number.max': 'El tamaño del archivo no debe exceder 3Mb',
        }),
    }),
});

export default createAdSchema;
