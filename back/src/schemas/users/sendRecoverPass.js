// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages(joiErrorMessages),
});

export default loginUserSchema;
