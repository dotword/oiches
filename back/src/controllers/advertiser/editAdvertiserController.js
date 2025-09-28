import editAdvertiserService from '../../services/advertisers/editAdvertiserService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import Joi from 'joi';
import joiErrorMessages from '../../schemas/joiErrorMessages.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const editAdvertiserController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const {
            company_name,
            contact_name,
            billing_address,
            city,
            postal_code,
            contact_phone,
            tax_id,
        } = req.body;

        // Validamos el body con Joi

        await validateSchemaUtil(
            Joi.object({
                company_name: Joi.string()
                    .allow('')
                    .optional()
                    .messages(joiErrorMessages),
                contact_name: Joi.string()
                    .allow('')
                    .optional()
                    .messages(joiErrorMessages),
                billing_address: Joi.string()
                    .allow('')
                    .optional()
                    .messages(joiErrorMessages),
                city: Joi.string()
                    .allow('')
                    .optional()
                    .messages(joiErrorMessages),
                postal_code: Joi.string()
                    .allow('')
                    .optional()
                    .messages(joiErrorMessages),
                contact_phone: Joi.number()
                    .min(0)
                    .allow('')
                    .optional()
                    .messages(joiErrorMessages),
                tax_id: Joi.string()
                    .allow('')
                    .optional()
                    .messages(joiErrorMessages),
            }),
            req.body
        );

        if (Object.keys(req.body).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (company_name !== undefined)
            updatedFields.company_name = company_name;
        if (contact_name !== undefined)
            updatedFields.contact_name = contact_name;
        if (billing_address !== undefined)
            updatedFields.billing_address = billing_address;
        if (city !== undefined) updatedFields.city = city;
        if (postal_code !== undefined) updatedFields.postal_code = postal_code;
        if (contact_phone !== undefined)
            updatedFields.contact_phone = contact_phone;
        if (tax_id !== undefined) updatedFields.tax_id = tax_id;

        await editAdvertiserService(userId, updatedFields);

        res.send({
            status: 'ok',
            message: 'Datos del anunciante actualizados',
        });
    } catch (error) {
        next(error);
    }
};

export default editAdvertiserController;
