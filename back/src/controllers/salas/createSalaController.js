// import listGenreController from '../listas/index.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createSalaSchema from '../../schemas/salas/createSalaSchema.js';
import { uploadPhotos } from '../../utils/uploadPhotos.js';
import insertSalaService from '../../services/salas/insertSalaService.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import insertSalaGeneroService from '../../services/salas/insertSalaGeneroService.js';

const createSalaController = async (req, res, next) => {
    try {
        const {
            nombre,
            provincia,
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

        console.log('BODY genero:  ', req.body.genero);
        const salaId = await insertSalaService(
            nombre,
            provincia,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
            req.user.id
        );

        // Recorremos el array de géneros, slice para evitar más de 3 géneros
        for (const gen of Object.values(req.body.genero).slice(0, 3)) {
            // insertamos los géneros en la tabla generos_salas
            insertSalaGeneroService(gen, salaId);
        }

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Para evitar que tenga más de 4 fotos aplicamos slice.
            for (const photo of Object.values(req.files).slice(0, 4)) {
                // Guardamos la foto y obtenemos su nombre. Redimensionamos a un ancho de 600px.
                const photoName = await uploadPhotos(photo, 600);

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
                    genero: req.body.genero,
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
