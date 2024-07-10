import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createSalaSchema from '../../schemas/salas/createSalaSchema.js';
import { uploadFiles } from '../../utils/uploadFiles.js';
import insertSalaService from '../../services/salas/insertSalaService.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';

const createSalaController = async (req, res, next) => {
    try {
        const {
            nombre,
            provincia,
            generos,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createSalaSchema,
            Object.assign(req.body, req.files)
        );

        const salaId = await insertSalaService(
            nombre,
            provincia,
            generos,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
            req.user.id
        );

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Para evitar que tenga más de 4 fotos aplicamos slice.
            for (const photo of Object.values(req.files).slice(0, 4)) {
                // Guardamos la foto y obtenemos su nombre. Redimensionamos a un ancho de 600px.
                const photoName = await uploadFiles(photo, 600);

                // Insertamos la foto en la tabla de fotos.
                await insertSalaPhotoService(photoName, salaId);

                // Pusheamos la foto al array de sala_fotos.
                photos.push({
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
                    generos: req.body.generos,
                    nombre,
                    provincia,
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
