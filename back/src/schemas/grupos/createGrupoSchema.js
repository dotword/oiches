// Importamos joi.
import Joi from 'joi';
import imgSchema from '../imgSchema.js';
import fileSchema from '../fileSchema.js';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createGrupoSchema = Joi.object({
    nombre: Joi.string().required().messages(joiErrorMessages),
    provincia: Joi.number().max(50).required().messages(joiErrorMessages),
    generos: Joi.number()
        .positive()
        .integer()
        .required()
        .messages(joiErrorMessages),
    honorarios: Joi.number().min(0).messages(joiErrorMessages),
    biografia: Joi.string().max(2000).messages(joiErrorMessages),
    rider: Joi.string().messages(joiErrorMessages),
    email: Joi.string().email().required().messages(joiErrorMessages),
    photoA: imgSchema.optional(),
    photoB: imgSchema.optional(),
    photoC: imgSchema.optional(),
    photoD: imgSchema.optional(),
    file: fileSchema.optional(),
});

export default createGrupoSchema;
