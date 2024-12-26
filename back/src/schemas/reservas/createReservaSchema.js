// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// fecha, hora, nombre

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newUserSchema = Joi.object({
    project: Joi.string().optional().max(40).messages(joiErrorMessages),
    fecha: Joi.date().required().messages(joiErrorMessages),
    flexible: Joi.optional().messages(joiErrorMessages),
    message: Joi.string().required().max(1000).messages({
        'string.empty': 'El campo "Mensaje" no puede estar vacio.',
        'string.max': 'El mensaje no debe exceder los {#limit} caracteres.',
    }),
});

export default newUserSchema;
