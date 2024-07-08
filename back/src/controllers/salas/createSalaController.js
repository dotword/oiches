// import listGenreController from '../listas/index.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createSalaSchema from '../../schemas/salas/createSalaSchema.js';
import uploadPhotos from '../../middleware/uploadPhotos.js';
import insertSalaService from '../../services/salas/insertSalaService.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import listSalasService from '../../services/listas/listGenreService.js';
import insertSalaGeneroService from '../../services/salas/insertSalaGeneroService.js';

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

        // console.log('Log: ' + Object.assign(req.body, req.files));
        // Validamos el body con Joi.
        await validateSchemaUtil(
            createSalaSchema,
            Object.assign(req.body, req.files)
        );

        // console.log(Object.values(req.files));
        const salaId = await insertSalaService(
            nombre,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
            req.user.id
        );

        // Array donde pushearemos los géneros.
        const generos = [];

        // Recorremos los géneros
        // for (const genero of Object.values(req.body.genero)) {
        // Guardamos el genero
        const generoId = req.body.genero;

        // Insertamos el género en la tabla generos_salas
        await insertSalaGeneroService(generoId, salaId);
        console.log('gen Id: ' + generoId + '  Sala: ' + salaId);

        // Pusheamos los géneros al array de generos_salas
        generos.push({
            generoId: generoId,
            salaId: salaId,
        });
        // }

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Para evitar que tenga más de 4 fotos aplicamos slice.
            for (const photo of Object.values(req.files).slice(0, 4)) {
                // Guardamos la foto y obtenemos su nombre. Redimensionamos a un ancho de 600px.
                const photoName = await uploadPhotos(photo, 600);

                // Insertamos la foto en la tabla de fotos.
                const photoId = await insertSalaPhotoService(photoName, salaId);

                // Pusheamos la foto al array de sala_fotos.
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
