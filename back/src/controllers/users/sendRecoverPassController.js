import randomstring from 'randomstring';

import selectUserByEmail from '../../services/users/selectUserByEmailService.js';
import updateRecoverPassService from '../../services/users/updateRecoverPassService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import sendRecoverPass from '../../schemas/users/sendRecoverPass.js';

const sendRecoverPassController = async (req, res, next) => {
    try {
        //Obtengo el mail de la persona que quiere recuperar password
        const { email } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(sendRecoverPass, req.body);

        //Compruebo si existe usuario con el email proporcionado
        const user = await selectUserByEmail(email);

        // Si no existe usuario con ese email, lanzo error
        if (!user)
            throw generateErrorsUtil(
                'No hay un usuario relacionado con ese correo electrónico',
                404
            );

        // Genero código de recuperación de password
        const recoverPassCode = randomstring.generate(10);

        // Inserto código de recuperación
        await updateRecoverPassService(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Enviado correo de recuperación de constraseña',
        });
    } catch (error) {
        next(error);
    }
};

export default sendRecoverPassController;
