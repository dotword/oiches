import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createAdSchema from '../../schemas/anunciantes/createAdSchema.js';
import createAdService from '../../services/advertisers/createAdService.js';

const createAdvertController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        console.log('userId', userId);
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

        // const { image } = req.files;
        // const sanitizedImage = {
        //     name: image.name,
        //     mimetype: image.mimetype,
        //     size: image.size,
        // };

        // Validamos el body con Joi.
        await validateSchemaUtil(createAdSchema, req.body);

        const advId = await createAdService(
            userId,
            category_id,
            package_id,
            address,
            city,
            provincia_id,
            title,
            description,
            link,
            contact_email,
            contact_phone
        );

        res.send({
            status: 'ok',
            adv: {
                id: advId,
                userId,
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
                // sanitizedImage,
                createdAt: new Date(),
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createAdvertController;
