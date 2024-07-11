import editGrupoService from '../../services/grupos/editGrupoService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditGrupoSchema from '../../schemas/grupos/createEditGrupoSchema.js';

const editGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const {
            nombre,
            provincia,
            generos,
            honorarios,
            biografia,
            rider,
            email,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createEditGrupoSchema,
            Object.assign(req.body)
        );

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (generos !== undefined) updatedFields.generos = generos;
        if (honorarios !== undefined) updatedFields.honorarios = honorarios;
        if (biografia !== undefined) updatedFields.biografia = biografia;
        if (rider !== undefined) updatedFields.rider = rider;
        if (email !== undefined) updatedFields.email = email;

        if (Object.keys(updatedFields).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

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
