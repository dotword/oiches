import editSalaService from '../../services/salas/editSalaService.js';
import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import { uploadFiles, deleteFiles } from '../../utils/uploadFiles.js';
import deleteSalaPhotoService from '../../services/salas/deleteSalaPhotoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditSalaSchema from '../../schemas/salas/createEditSalaSchema.js';
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
            email,
            deletePhoto,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createEditSalaSchema,
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
        if (email !== undefined) updatedFields.email = email;
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

        // Si la sala tiene más de 4 archivos lanzamos un error.
        if (req.files !== null && sala.photos.length > 3)
            throw generateErrorsUtil(
                'No se pueden subir más de fotos a la sala',
                409
            );

        if (req.files !== null) {
            // Guardamos la foto en la carpeta uploads y obtenemos su nombre.
            const photoName = await uploadFiles(req.files.photo);

            // Guardamos la foto en la base de datos y obtenemos el id de la misma.
            await insertSalaPhotoService(photoName, idSala);
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
