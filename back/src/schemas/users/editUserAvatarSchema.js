// Importamos joi.
import joi from 'joi';

// Importamos el esquema que verifica una imagen.
import imgSchema from '../imgSchema.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editUserAvatarSchema = joi.object({
    avatar: imgSchema.required(),
});

export default editUserAvatarSchema;
