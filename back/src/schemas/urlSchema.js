// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from './joiErrorMessages.js';

// Creamos un esquema para validar imágenes. De esta forma podremos reutilizar este esquema
// en los esquemas de validación de los endpoints que requieran imágenes.
const urlSchema = joi
    .object({
        url: joi.string().uri().messages(joiErrorMessages),
    })
    .unknown(true);

export default urlSchema;
