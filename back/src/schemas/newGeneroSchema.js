// Importamos joi.
import Joi from 'joi';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newGeneroSchema = Joi.object({
    newGenero: Joi.alternatives().try(
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
});

export default newGeneroSchema;
