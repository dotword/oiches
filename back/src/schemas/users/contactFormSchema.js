// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const loginUserSchema = Joi.object({
    nombreContacto: Joi.string().max(200).messages(joiErrorMessages),
    nombreSalaArtista: Joi.string().max(200).messages(joiErrorMessages),
    emailFrom: Joi.string().email().required().messages(joiErrorMessages),
    mensaje: Joi.string().max(2000).required().messages(joiErrorMessages),
});

export default loginUserSchema;
