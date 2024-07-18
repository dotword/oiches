// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from './joiErrorMessages.js';

// Creamos un esquema para validar imágenes. De esta forma podremos reutilizar este esquema
// en los esquemas de validación de los endpoints que requieran imágenes.
const fileSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid(
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp',
                'application/pdf'
            )
            .required()
            .messages({
                'any.only': 'Solo se permiten archivos jpeg, png, webp o pdf',
            }),
        size: joi.number().max(3000000).required().messages(joiErrorMessages),
    })
    .unknown(true);

export default fileSchema;
