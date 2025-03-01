// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createNoticeboardSchema = Joi.object({
    category_id: Joi.number().max(50).required().messages(joiErrorMessages),
    salaGrupo_id: Joi.string().optional().max(50).messages(joiErrorMessages),
    provincia: Joi.number().optional().max(50).messages(joiErrorMessages),
    titulo: Joi.string().max(200).required().messages(joiErrorMessages),
    descripcion: Joi.string().max(2000).required().messages(joiErrorMessages),
});

export default createNoticeboardSchema;
