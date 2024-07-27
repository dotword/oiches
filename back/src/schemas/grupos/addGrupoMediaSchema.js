// Importamos joi.
import Joi from 'joi';
import fileSchema from '../fileSchema.js';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const addGrupoMediaSchema = Joi.object({
    mediaName: Joi.string().uri().allow('').messages(joiErrorMessages),
});

export default addGrupoMediaSchema;
