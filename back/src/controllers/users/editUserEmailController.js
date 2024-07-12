import updateUserService from '../../services/users/updateUserService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import sendRecoverPass from '../../schemas/users/sendRecoverPass.js';

const editUserEmailController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { email } = req.body;
        const { id } = req.user;

        // Validamos el body con Joi.
        await validateSchemaUtil(sendRecoverPass, req.body);

        if (id === userId) {
            await updateUserService(userId, email);
        } else {
            throw generateErrorsUtil('No se puede realizar esta acción');
        }

        res.send({
            status: 'ok',
            message: 'Usuario modificado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserEmailController;
