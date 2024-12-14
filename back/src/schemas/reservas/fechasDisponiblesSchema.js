// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const fechasDisponiblesSchema = Joi.object({
    fechaDisponible: Joi.array()
        .items(Joi.date().required())
        .required()
        .messages(joiErrorMessages),
});

export default fechasDisponiblesSchema;
