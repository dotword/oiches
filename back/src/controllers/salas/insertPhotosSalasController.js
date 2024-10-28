import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import { updateMainSalaPhotoService } from '../../services/salas/insertSalaPhotoService.js';
import { uploadFiles } from '../../utils/uploadFiles.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import addSalaPhotoSchema from '../../schemas/salas/addSalaPhotoSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const insertPhotosSalaController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            addSalaPhotoSchema,
            Object.assign(req.files || {})
        );

        const sala = await selectSalaByIdService(idSala);

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        if (!req.files)
            throw generateErrorsUtil(
                'No se ha proporcionado ninguna foto',
                400
            );
        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Comprobar que no hay más de 4 fotos en la sala
            if (sala.fotos.length > 3)
                throw generateErrorsUtil(
                    'No se pueden subir más de 4 fotos a la sala.',
                    400
                );

            // Recorremos las fotos. Para evitar que tenga más de 4 fotos aplicamos slice.
            for (const photo of Object.values(req.files).slice(0, 4)) {
                // Guardamos la foto y obtenemos su nombre. Redimensionamos a un ancho de 600px.
                const photoName = await uploadFiles(photo, 1000);

                // Insertamos la foto en la tabla de fotos.
                await insertSalaPhotoService(photoName, idSala);

                // Pusheamos la foto al array de sala_fotos.
                photos.push({
                    name: photoName,
                });
            }
        }

        res.send({
            status: 'ok',
            message: 'Foto subida',
        });
    } catch (error) {
        next(error);
    }
};

export const setMainPhotoController = async (req, res, next) => {
    try {
        const { idSala, photoId } = req.params;

        // Llama al servicio para actualizar la foto principal.
        await updateMainSalaPhotoService(photoId, idSala);

        res.send({
            status: 'ok',
            message: 'Foto principal actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};
