import editAdvertService from '../../services/advertisers/editAdvertService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import renewAdSchema from '../../schemas/anunciantes/renewAdSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const renewAdvertController = async (req, res, next) => {
    try {
        const { idAdvert } = req.params;

        const {
            category_id,
            package_id,
            address,
            city,
            provincia_id,
            title,
            description,
            link,
            contact_email,
            contact_phone,
        } = req.body;

        // Validamos el body con Joi
        await validateSchemaUtil(renewAdSchema, req.body);

        if (Object.keys(req.body).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (category_id !== undefined) updatedFields.category_id = category_id;
        if (package_id !== undefined) updatedFields.package_id = package_id;
        if (address !== undefined) updatedFields.address = address;
        if (city !== undefined) updatedFields.city = city;
        if (provincia_id !== undefined)
            updatedFields.provincia_id = provincia_id;
        if (title !== undefined) updatedFields.title = title;
        if (description !== undefined) updatedFields.description = description;
        if (link !== undefined) updatedFields.link = link;
        if (contact_email !== undefined)
            updatedFields.contact_email = contact_email;
        if (contact_phone !== undefined)
            updatedFields.contact_phone = contact_phone;
        updatedFields.status = 0;
        updatedFields.expiresAt = null;

        await editAdvertService(idAdvert, updatedFields);

        res.send({
            status: 'ok',
            message: 'Anuncio actualizado',
        });
    } catch (error) {
        next(error);
    }
};

export default renewAdvertController;
