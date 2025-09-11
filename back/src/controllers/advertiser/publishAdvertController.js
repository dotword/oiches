import publishAdvertService from '../../services/advertisers/publishAdvertService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import Joi from 'joi';
import joiErrorMessages from '../../schemas/joiErrorMessages.js';

const publishAdvertController = async (req, res, next) => {
    try {
        const { idAdvert } = req.params;
        const { newExpiresAt, publishedAt, status } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            Joi.object({
                newExpiresAt: Joi.date().required().messages(joiErrorMessages),
                publishedAt: Joi.date().required().messages(joiErrorMessages),
                status: Joi.number()
                    .max(1)
                    .required()
                    .messages(joiErrorMessages),
            }),
            req.body
        );

        await publishAdvertService(idAdvert, newExpiresAt, publishedAt, status);

        res.send({
            status: 'ok',
            message: 'Anuncio publicado con éxito',
        });
    } catch (error) {
        next(error);
    }
};

export default publishAdvertController;
