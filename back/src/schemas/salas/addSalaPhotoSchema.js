// Importamos joi.
import joi from 'joi';

// Importamos el esquema que verifica una imagen.
import imgSchema from '../imgSchema.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const addSalaPhotoSchema = joi.object({
    photoA: imgSchema.optional(),
    photoB: imgSchema.optional(),
    photoC: imgSchema.optional(),
    photoD: imgSchema.optional(),
});

export default addSalaPhotoSchema;
