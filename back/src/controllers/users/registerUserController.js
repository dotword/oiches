import randomstring from 'randomstring';
import insertUserService from '../../services/users/insertUserService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import newUserSchema from '../../schemas/users/newUserSchema.js';

const registerUserController = async (req, res, next) => {
    try {
        const { username, email, password, roles } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(newUserSchema, req.body);

        // Creamos el código de registro.
        const registrationCode = randomstring.generate(30);

        // Insertamos el usuario.
        await insertUserService(
            username,
            email,
            password,
            roles,
            registrationCode
        );

        res.send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, verifica tu usuario mediante el enlace que has recibido en tu email',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserController;
