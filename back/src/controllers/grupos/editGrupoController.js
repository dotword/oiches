import editGrupoService from '../../services/grupos/editGrupoService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditGrupoSchema from '../../schemas/grupos/editGrupoSchema.js';
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';
// import {
//     insertGrupoGenerosService,
//     deleteGrupoGenerosService,
// } from '../../services/grupos/insertGrupoGenerosService.js';

const editGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const {
            nombre,
            provincia,
            honorarios,
            biografia,
            // newGenero,
            // deleteGenero,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createEditGrupoSchema,
            Object.assign(req.body, req.files || {})
        );

        if (Object.keys(req.body).length === 0 && req.files === undefined)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Obtenemos la información del grupo
        await selectGrupoByIdService(idGrupo);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (honorarios !== undefined) updatedFields.honorarios = honorarios;
        if (biografia !== undefined) updatedFields.biografia = biografia;

        await editGrupoService(idGrupo, updatedFields);

        // // Añadir nuevos géneros al grupo
        // if (newGenero) {
        //     const generosList = [];
        //     const generosArray = Array.isArray(newGenero)
        //         ? newGenero
        //         : newGenero.split(',');

        //     for (const genero of generosArray) {
        //         await insertGrupoGenerosService(genero.trim(), idGrupo);
        //         generosList.push({ generoId: genero.trim() });
        //     }
        // }

        // Borrar géneros
        // if (deleteGenero) {
        //     const deleteGenerosList = [];
        //     const generosArray = Array.isArray(deleteGenero)
        //         ? deleteGenero
        //         : deleteGenero.split(',');

        //     for (const genero of generosArray) {
        //         await deleteGrupoGenerosService(genero.trim(), idGrupo);
        //         deleteGenerosList.push({ generoId: genero.trim() });
        //     }
        // }

        res.send({
            status: 'ok',
            message: 'Grupo actualizado!!',
        });
    } catch (error) {
        next(error);
    }
};

export default editGrupoController;
