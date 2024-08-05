import {
    deleteSalaGenerosService,
    insertSalaGenerosService,
} from '../../services/salas/insertSalaGenerosService.js';

import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import newGeneroSchema from '../../schemas/newGeneroSchema.js';

export const deleteSalaGeneroController = async (req, res, next) => {
    try {
        const { idSala } = req.params;
        const { genreDelete } = req.body;

        if (!genreDelete) {
            throw generateErrorsUtil(
                'No se proporcionaron géneros para eliminar',
                400
            );
        }

        // Convertimos genreDelete a un array si no lo es
        const generosArray = Array.isArray(genreDelete)
            ? genreDelete
            : genreDelete.split(',');

        // Borrar media
        if (generosArray.length > 0) {
            await deleteSalaGenerosService(generosArray, idSala);
        }

        res.send({
            status: 'ok',
            message: 'Géneros borrados',
        });
    } catch (error) {
        next(error);
    }
};

export const addSalaGeneroController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

        const { newGenero } = req.body;
        await validateSchemaUtil(newGeneroSchema, Object.assign(req.body));

        if (Object.keys(req.body).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        await selectSalaByIdService(idSala);

        // Añadir nuevos géneros al grupo
        if (newGenero) {
            const generosList = [];
            const generosArray = Array.isArray(newGenero)
                ? newGenero
                : newGenero.split(',');

            for (const genero of generosArray) {
                await insertSalaGenerosService(genero.trim(), idSala);
                generosList.push({ generoId: genero.trim() });
            }
        }

        // Hacer una query para sacar los generos actuales
        let newGeneros = [];

        res.send({
            status: 'ok',
            message: 'Géneros añadidos',
            data: newGeneros,
        });
    } catch (error) {
        next(error);
    }
};
