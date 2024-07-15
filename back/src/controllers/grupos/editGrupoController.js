import editGrupoService from '../../services/grupos/editGrupoService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditGrupoSchema from '../../schemas/grupos/createEditGrupoSchema.js';
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';
import {
    insertGrupoMediaService,
    deleteGrupoMediaService,
} from '../../services/grupos/insertGrupoMediaService.js';
import { uploadFiles, deleteFiles } from '../../utils/uploadFiles.js';
import {
    insertGrupoPhotoService,
    deleteGrupoPhotoService,
} from '../../services/grupos/insertGrupoPhotoService.js';

const editGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const {
            nombre,
            provincia,
            generos,
            honorarios,
            biografia,
            rider,
            email,
            mediaName,
            mediaDelete,
            deletePhoto,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createEditGrupoSchema,
            Object.assign(req.body, req.files || {})
        );

        if (Object.keys(req.body).length === 0 && req.files === undefined)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Obtenemos la información del grupo
        const grupo = await selectGrupoByIdService(idGrupo);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (generos !== undefined) updatedFields.generos = generos;
        if (honorarios !== undefined) updatedFields.honorarios = honorarios;
        if (biografia !== undefined) updatedFields.biografia = biografia;
        if (rider !== undefined) updatedFields.rider = rider;
        if (email !== undefined) updatedFields.email = email;

        await editGrupoService(idGrupo, updatedFields);

        // Si el grupo tiene más de 4 enlaces lanzamos un error.
        if (mediaName !== undefined && grupo.media.length > 3)
            throw generateErrorsUtil(
                'No se pueden subir más de 4 enlaces al grupo',
                409
            );

        // Guardamos el enlace en DB.
        if (mediaName !== undefined) {
            await insertGrupoMediaService(mediaName, idGrupo);
        }

        // Borrar media
        if (mediaDelete !== undefined) {
            await deleteGrupoMediaService(mediaDelete);
        }

        // Borrar files
        if (deletePhoto !== undefined) {
            const photoName = grupo.photos.find(
                (photo) => photo.id === deletePhoto
            );

            if (photoName === undefined)
                throw generateErrorsUtil(
                    'No se encuentra el archivo que intentas borrar',
                    400
                );

            const deleted = photoName.name;

            // Borramos la foto de la carpeta de subida de archivos.
            await deleteFiles(deleted);
            await deleteGrupoPhotoService(deletePhoto);
        }

        // Si el grupo tiene más de 5 archivos lanzamos un error.
        if (req.files !== null && grupo.photos.length > 4)
            throw generateErrorsUtil(
                'No se pueden subir más de 5 archivos al grupo',
                409
            );

        if (req.files !== null) {
            // Guardamos la foto en la carpeta uploads y obtenemos su nombre.
            const photoName = await uploadFiles(req.files.photo);

            // Guardamos la foto en la base de datos y obtenemos el id de la misma.
            await insertGrupoPhotoService(photoName, idGrupo);
        }

        res.send({
            status: 'ok',
            message: 'Grupo actualizado!!',
        });
    } catch (error) {
        next(error);
    }
};

export default editGrupoController;
