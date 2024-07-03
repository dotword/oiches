// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// fecha, hora, nombre

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newUserSchema = Joi.object({
    nombre: Joi.string().max(100).required().messages(joiErrorMessages),
    fecha: Joi.date().required().messages(joiErrorMessages),
    hora: Joi.string().max(5).required().messages(joiErrorMessages),
});

export default newUserSchema;
