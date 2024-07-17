import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createGrupoSchema from '../../schemas/grupos/createGrupoSchema.js';
import { uploadFiles } from '../../utils/uploadFiles.js';
import insertGrupoService from '../../services/grupos/insertGrupoService.js';
import { insertGrupoPhotoService } from '../../services/grupos/insertGrupoPhotoService.js';
import { insertGrupoMediaService } from '../../services/grupos/insertGrupoMediaService.js';

const createGrupoController = async (req, res, next) => {
    try {
        const {
            nombre,
            provincia,
            generos,
            honorarios,
            biografia,
            rider,
            media,
        } = req.body;
        console.log('media ', media);

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createGrupoSchema,
            Object.assign(req.body, req.files || {})
        );

        const grupoId = await insertGrupoService(
            nombre,
            provincia,
            generos,
            honorarios,
            biografia,
            req.user.id,
            rider
        );

        const medias = [];
        if (req.body.media) {
            for (const media of Object.values(req.body.media).slice(0, 5)) {
                await insertGrupoMediaService(media, grupoId);
                medias.push({
                    url: media,
                });
            }
        }

        // Array donde pushearemos las fotos (si hay).
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Para evitar que tenga más de 4 fotos aplicamos slice.
            for (const photo of Object.values(req.files).slice(0, 5)) {
                // Guardamos la foto y obtenemos su nombre. Redimensionamos a un ancho de 600px.
                const photoName = await uploadFiles(photo);

                // Insertamos la foto en la tabla de fotos.
                await insertGrupoPhotoService(photoName, grupoId);

                // Pusheamos la foto al array de sala_fotos.
                photos.push({
                    name: photoName,
                });
            }
        }
        res.send({
            status: 'ok',
            data: {
                grupo: {
                    id: grupoId,
                    usuario_id: req.user.id,
                    generos: req.body.generos,
                    nombre,
                    provincia,
                    honorarios,
                    biografia,
                    rider,
                    photos,
                    medias,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createGrupoController;
