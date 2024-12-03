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
    message: Joi.string().optional().max(1000).messages(joiErrorMessages),
});

export default newUserSchema;
