import randomstring from 'randomstring';
import registerVoterEmailService from '../../services/concurso/registerVoterEmailService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import Joi from 'joi';
import joiErrorMessages from '../../schemas/joiErrorMessages.js';

const registerVoterEmailController = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            Joi.object({
                email: Joi.string()
                    .email()
                    .required()
                    .messages(joiErrorMessages),
            }),
            req.body
        );

        // Creamos el verification token y expiration.
        const verification_token = randomstring.generate(30);
        const expiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 24 horas

        // Insertamos el votante.
        await registerVoterEmailService(email, verification_token, expiration);

        res.send({
            status: 'ok',
            message:
                'Email registrado. Por favor, verifica tu correo electrónico mediante el enlace que has recibido en tu email',
        });
    } catch (error) {
        next(error);
    }
};

export default registerVoterEmailController;
