import insertSalaService from '../../services/salas/insertSalaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createSalaSchema from '../../schemas/salas/createSalaSchema.js';
import uploadPhotos from '../../middleware/uploadPhotos.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';

const createSalaController = async (req, res, next) => {
    try {
        const {
            nombre,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(createSalaSchema, req.body);

        const { id } = req.user;

        const salaId = await insertSalaService(
            id,
            nombre,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email
        );

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Utilizamos el método "Object.values" para obtener un
            // array de fotos. Para evitar que el array de fotos tenga más de tres fotos aplicamos
            // el método slice.
            for (const photo of Object.values(req.files).slice(0, 3)) {
                // Guardamos la foto en disco y obtenemos su nombre. Redimensionamos a un ancho
                // de 500px.
                const photoName = await uploadPhotos(photo, 600);

                // Insertamos la foto en la tabla de fotos.
                const photoId = await insertSalaPhotoService(photoName, salaId);

                // Pusheamos la foto al array de fotos.
                photos.push({
                    id: photoId,
                    name: photoName,
                });
            }
        }
        res.send({
            satus: 'ok',
            data: {
                sala: {
                    id: salaId,
                    usuario_id: req.user.id,
                    nombre,
                    capacidad,
                    descripcion,
                    precios,
                    direccion,
                    condiciones,
                    equipamiento,
                    email,
                    photos,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createSalaController;
