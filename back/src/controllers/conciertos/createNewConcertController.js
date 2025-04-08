import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createConciertoSchema from '../../schemas/conciertos/createConciertoSchema.js';
import crearConciertoService from '../../services/conciertos/crearConciertoService.js';
import uploadFiles from '../../utils/uploadFiles.js';

const createNewConcertController = async (req, res, next) => {
    try {
        const { reservaId } = req.params;
        const {
            title,
            fecha,
            hora,
            precioAnticipada,
            precio,
            description,
            link,
            salaLink,
        } = req.body;

        const { image } = req.files;
        const sanitizedImage = {
            name: image.name,
            mimetype: image.mimetype,
            size: image.size,
        };

        // Validamos el body con Joi.
        await validateSchemaUtil(createConciertoSchema, {
            ...req.body,
            image: sanitizedImage,
        });

        const poster = await uploadFiles(image, 1000);

        await crearConciertoService(
            reservaId,
            title,
            fecha,
            hora,
            precioAnticipada,
            precio,
            description,
            link,
            salaLink,
            poster
        );

        res.send({
            status: 'ok',
            message: 'Concierto creado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default createNewConcertController;
