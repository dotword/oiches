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
            .messages({
                'any.only':
                    'El tipo de archivo debe ser uno de los siguientes: jpeg, jpg, png, webp',
            }),
        size: joi.number().max(3000000).required().messages({
            'number.max': 'El tamaño del archivo no debe exceder 3 MB',
        }),
    })
    .unknown(true);

export default imgSchema;
