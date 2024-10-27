import editGrupoService from '../../services/grupos/editGrupoService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditGrupoSchema from '../../schemas/grupos/editGrupoSchema.js';
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';

const editGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const {
            nombre,
            provincia,
            web,
            honorarios,
            honorarios_to,
            condiciones,
            biografia,
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
        if (web !== undefined) updatedFields.web = web;
        if (honorarios !== undefined) updatedFields.honorarios = honorarios;
        if (honorarios_to !== undefined)
            updatedFields.honorarios_to = honorarios_to;
        if (condiciones !== undefined) updatedFields.condiciones = condiciones;
        if (biografia !== undefined) updatedFields.biografia = biografia;

        await editGrupoService(idGrupo, updatedFields);

        res.send({
            status: 'ok',
            message: 'Grupo actualizado!!',
        });
    } catch (error) {
        next(error);
    }
};

export default editGrupoController;
