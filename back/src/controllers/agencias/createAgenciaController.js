import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createAgenciaSchema from '../../schemas/agencias/createAgenciaSchema.js';
import insertAgenciaService from '../../services/agencias/insertAgenciaService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createAgenciaController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const adminUser = await selectUserByIdService(req.user.id);

        if (req.user.id !== userId && adminUser[0].roles !== 'admin')
            throw generateErrorsUtil('No puedes crear este proyecto', 400);

        const { nombre, provincia, web, descripcion } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(createAgenciaSchema, req.body);

        const grupoId = await insertAgenciaService(
            nombre,
            provincia,
            web,
            descripcion,
            userId
        );

        res.send({
            status: 'ok',
            data: {
                grupo: {
                    id: grupoId,
                    userId,
                    nombre,
                    provincia,
                    web,
                    descripcion,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createAgenciaController;
