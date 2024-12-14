// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// fecha, hora, nombre

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const deleteFechaDisponibleSchema = Joi.object({
    fechaDisponible: Joi.date().required().messages(joiErrorMessages),
});

export default deleteFechaDisponibleSchema;
