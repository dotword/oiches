// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editUserRecoveryPassSchema = Joi.object({
    email: Joi.string().email().required().messages(joiErrorMessages),
    recoverPassCode: Joi.string().required().messages(joiErrorMessages),
    newPass: Joi.string()
        .min(6) // Al menos 6 caracteres
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$')) // Al menos una letra y un número
        .required()
        .messages({
            'string.min': 'La contraseña debe tener al menos 6 caracteres.',
            'string.pattern.base':
                'La contraseña debe contener al menos una letra y un número.',
            'any.required': 'La contraseña es un campo obligatorio.',
        }),
});

export default editUserRecoveryPassSchema;
