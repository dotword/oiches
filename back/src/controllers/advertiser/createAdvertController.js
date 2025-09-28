import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createAdSchema from '../../schemas/anunciantes/createAdSchema.js';
import createAdService from '../../services/advertisers/createAdService.js';
import uploadFiles from '../../utils/uploadFiles.js';

const createAdvertController = async (req, res, next) => {
    try {
        const { userId } = req.params;

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

        const { image } = req.files;
        const sanitizedImage = {
            name: image.name,
            mimetype: image.mimetype,
            size: image.size,
        };

        // Validamos el body con Joi.
        await validateSchemaUtil(createAdSchema, {
            ...req.body,
            image: sanitizedImage,
        });

        const poster = await uploadFiles(image, 1800);

        await createAdService(
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
            poster
        );

        res.send({
            status: 'ok',
            message: 'Anuncio creado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default createAdvertController;
