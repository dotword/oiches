import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createAdvertiserSchema from '../../schemas/anunciantes/createAdvertiserSchema.js';
import insertAdvertiserService from '../../services/advertisers/createAdvertiserService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createAdvertiserController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userDetails = await selectUserByIdService(req.user.id);

        const {
            nombreEmpresa,
            nombreContacto,
            direccion,
            ciudad,
            codigoPostal,
            telefono,
            cif,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createAdvertiserSchema,
            Object.assign(req.body, req.files)
        );

        if (req.user.id !== userId && userDetails[0].roles !== 'admin')
            throw generateErrorsUtil('No puedes crear este proyecto', 400);

        await insertAdvertiserService(
            userId,
            nombreEmpresa,
            nombreContacto,
            direccion,
            ciudad,
            codigoPostal,
            telefono,
            cif
        );

        res.send({
            status: 'ok',
            anunciante: {
                usuario_id: userId,
                nombreEmpresa,
                nombreContacto,
                direccion,
                ciudad,
                codigoPostal,
                telefono,
                cif,
                createdAt: new Date(),
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createAdvertiserController;
