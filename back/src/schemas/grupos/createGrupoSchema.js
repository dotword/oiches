// Importamos joi.
import Joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const createGrupoSchema = Joi.object({
    nombre: Joi.string().required().messages(joiErrorMessages),
    provincia: Joi.number().max(60).required().messages(joiErrorMessages),
    generos: Joi.alternatives()
        .required()
        .messages(joiErrorMessages)
        .try(
            Joi.array().items(Joi.number().integer().positive()), // Permitir cualquier ID de género positivo
            Joi.string().custom((value, helpers) => {
                const generosArray = value.split(',').map(Number);
                const valid = generosArray.every(
                    (genero) => Number.isInteger(genero) && genero > 0
                );
                if (!valid) {
                    return helpers.message('Género no válido');
                }
                return generosArray;
            }, 'Géneros validados')
        ),
    web: Joi.string().uri().required().messages(joiErrorMessages),
    honorarios: Joi.number().min(0).messages(joiErrorMessages),
    honorarios_to: Joi.number().min(0).messages(joiErrorMessages),
    condiciones: Joi.string().max(2000).messages(joiErrorMessages),
    biografia: Joi.string().max(2000).messages(joiErrorMessages),
});

export default createGrupoSchema;
