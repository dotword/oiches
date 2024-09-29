// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createEditGrupoSchema = Joi.object({
    nombre: Joi.string().messages(joiErrorMessages),
    provincia: Joi.number().max(50).messages(joiErrorMessages),
    honorarios: Joi.number().min(0).allow(null, '').messages(joiErrorMessages),
    honorarios_to: Joi.number()
        .min(0)
        .allow(null, '')
        .messages(joiErrorMessages),
    biografia: Joi.string().max(2000).allow('').messages(joiErrorMessages),
});

export default createEditGrupoSchema;
