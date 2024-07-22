import editSalaService from '../../services/salas/editSalaService.js';
import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import { uploadFiles, deleteFiles } from '../../utils/uploadFiles.js';
import deleteSalaPhotoService from '../../services/salas/deleteSalaPhotoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editSalaSchema from '../../schemas/salas/editSalaSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const editSalaController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

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
            horaReservasStart,
            horaReservasEnd,
            deletePhoto,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            editSalaSchema,
            Object.assign(req.body, req.files || {})
        );

        if (Object.keys(req.body).length === 0 && req.files === undefined)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Obtenemos la información de la sala para comprobar si somos los propietarios.
        const sala = await selectSalaByIdService(idSala);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (capacidad !== undefined) updatedFields.capacidad = capacidad;
        if (descripcion !== undefined) updatedFields.descripcion = descripcion;
        if (precios !== undefined) updatedFields.precios = precios;
        if (direccion !== undefined) updatedFields.direccion = direccion;
        if (condiciones !== undefined) updatedFields.condiciones = condiciones;
        if (equipamiento !== undefined)
            updatedFields.equipamiento = equipamiento;
        if (horaReservasStart !== undefined)
            updatedFields.horaReservasStart = horaReservasStart;
        if (horaReservasEnd !== undefined)
            updatedFields.horaReservasEnd = horaReservasEnd;
        if (generos !== undefined) updatedFields.generos = generos;

        await editSalaService(idSala, updatedFields);

        // Borrar files
        if (deletePhoto !== undefined) {
            const photoName = sala.photos.find(
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
            await deleteSalaPhotoService(deletePhoto);
        }

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Para evitar que tenga más de 4 fotos aplicamos slice.
            for (const photo of Object.values(req.files).slice(0, 4)) {
                // Guardamos la foto y obtenemos su nombre. Redimensionamos a un ancho de 600px.
                const photoName = await uploadFiles(photo, 600);

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
            message: 'Sala actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default editSalaController;
