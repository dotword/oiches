// Importamos joi.
import joi from 'joi';

// Importamos el esquema que verifica una imagen.
import imgGrupoSchema from '../fileSchema.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const addGrupoPhotoSchema = joi.object({
    photo: imgGrupoSchema.required(),
});

export default addGrupoPhotoSchema;
