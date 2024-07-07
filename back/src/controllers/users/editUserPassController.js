import editUserRecoveryPassSchema from '../../schemas/users/editUserRecoveryPassSchema.js';
import updateUserPassModel from '../../services/users/updateUserPassService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

const editUserPassController = async (req, res, next) => {
    try {
        const { email, recoverPassCode, newPass } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(editUserRecoveryPassSchema, req.body);

        await updateUserPassModel(email, recoverPassCode, newPass);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserPassController;
