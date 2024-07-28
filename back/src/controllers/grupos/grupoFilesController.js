import { deleteFiles } from '../../utils/uploadFiles.js';
import deleteGrupoPhotoService from '../../services/grupos/deleteGrupoPhotoService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';
import uploadFiles from '../../utils/uploadFiles.js';
import { insertGrupoPhotoService } from '../../services/grupos/insertGrupoPhotoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import addPdfSchema from '../../schemas/grupos/addPdfSchema.js';
import addGrupoPhotoSchema from '../../schemas/grupos/addGrupoPhotoSchema.js';

export const deleteFileGrupoController = async (req, res, next) => {
    try {
        const { photoName, deletePhoto } = req.params;

        const deleted = photoName;

        await deleteFiles(deleted);
        await deleteGrupoPhotoService(deletePhoto);

        res.send({
            status: 'ok',
            message: 'Archivo borrado',
        });
    } catch (error) {
        next(error);
    }
};

export const addPdfGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        // Validamos el body con Joi.
        await validateSchemaUtil(addPdfSchema, Object.assign(req.files || {}));

        const grupo = await selectGrupoByIdService(idGrupo);

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        if (!req.files)
            throw generateErrorsUtil(
                'No se ha proporcionado ningún archivo',
                400
            );

        if (req.files) {
            // Comprobar que no hay otro pdf subido
            if (grupo.pdf.length > 0)
                throw generateErrorsUtil('Solo se puede subir un pdf', 400);

            for (const rider of Object.values(req.files)) {
                // Guardamos el archivo y obtenemos su nombre.
                const photoName = await uploadFiles(rider);

                // Insertamos la foto en la tabla de fotos.
                await insertGrupoPhotoService(photoName, idGrupo);

                // Pusheamos la foto al array de sala_fotos.
                photos.push({
                    name: photoName,
                });
            }
        }

        res.send({
            status: 'ok',
            message: 'Rider Subido',
        });
    } catch (error) {
        next(error);
    }
};

export const addPhotosGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            addGrupoPhotoSchema,
            Object.assign(req.files || {})
        );

        const grupo = await selectGrupoByIdService(idGrupo);

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        if (!req.files)
            throw generateErrorsUtil(
                'No se ha proporcionado ningún archivo',
                400
            );

        if (req.files) {
            // Comprobar que no hay más de 4 fotos
            if (grupo.pdf.length > 3)
                throw generateErrorsUtil(
                    'No se pueden subir más de 4 fotos.',
                    400
                );

            for (const photo of Object.values(req.files)) {
                // Guardamos el archivo y obtenemos su nombre.
                const photoName = await uploadFiles(photo);
                // Insertamos la foto en la tabla de fotos.
                await insertGrupoPhotoService(photoName, idGrupo);
                // Pusheamos la foto al array grupo_fotos.
                photos.push({
                    name: photoName,
                });
            }
        }

        res.send({
            status: 'ok',
            message: 'Foto subida con éxito',
        });
    } catch (error) {
        next(error);
    }
};
