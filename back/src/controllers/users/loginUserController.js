import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRATION } from '../../../env.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import loginUserSchema from '../../schemas/users/loginUserSchema.js';
import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(loginUserSchema, req.body);

        // Seleccionamos los datos del usuario que necesitamos utilizando el email.
        const user = await selectUserByEmailService(email);

        // Variable que almacenará un valor booleano indicando si la contraseña es correcto o no.
        let validPass;

        // Si existe un usuario comprobamos si la contraseña coincide.
        if (user) {
            // Comprobamos si la contraseña es válida.
            validPass = await bcrypt.compare(password, user.password);
        }

        // Si las contraseña no coincide o no existe un usuario con el email proporcionado
        // lanzamos un error.
        if (!user || !validPass)
            throw generateErrorsUtil('Credenciales inválidas', 401);

        // Si el usuario no está activo lanzamos un error.
        if (!user.active)
            throw generateErrorsUtil(
                'Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.',
                403
            );

        // Objeto con la información que queremos almacenar en el token.
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        // Creamos el token.
        const token = jwt.sign(tokenInfo, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION,
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default loginUserController;
