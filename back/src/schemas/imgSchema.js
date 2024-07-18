// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from './joiErrorMessages.js';

// Creamos un esquema para validar imágenes. De esta forma podremos reutilizar este esquema
// en los esquemas de validación de los endpoints que requieran imágenes.
const imgSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/jpg', 'image/png', 'image/webp')
            .required()
            .messages(joiErrorMessages),
        size: joi.number().max(3000000).required().messages(joiErrorMessages),
    })
    .unknown(true);

export default imgSchema;
