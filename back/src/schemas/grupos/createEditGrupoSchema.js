// Importamos joi.
import Joi from 'joi';
import fileSchema from '../fileSchema.js';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createEditGrupoSchema = Joi.object({
    nombre: Joi.string().messages(joiErrorMessages),
    provincia: Joi.number().max(50).messages(joiErrorMessages),
    generos: Joi.number().positive().integer().messages(joiErrorMessages),
    honorarios: Joi.number().min(0).messages(joiErrorMessages),
    biografia: Joi.string().max(2000).messages(joiErrorMessages),
    rider: Joi.string().max(2000).messages(joiErrorMessages),
    mediaName: Joi.string().uri().messages(joiErrorMessages),
    mediaDelete: Joi.string().uri().messages(joiErrorMessages),
    photo: fileSchema.optional(),
    deletePhoto: Joi.string().messages(joiErrorMessages),
});

export default createEditGrupoSchema;
