import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createGrupoSchema from '../../schemas/grupos/createGrupoSchema.js';
import { uploadFiles } from '../../utils/uploadFiles.js';
import insertGrupoService from '../../services/grupos/insertGrupoService.js';
import insertGrupoPhotoService from '../../services/grupos/insertGrupoPhotoService.js';

const createGrupoController = async (req, res, next) => {
    try {
        const {
            nombre,
            provincia,
            generos,
            honorarios,
            biografia,
            rider,
            email,
        } = req.body;
        // Validamos el body con Joi.
        await validateSchemaUtil(
            createGrupoSchema,
            Object.assign(req.body, req.files)
        );

        const grupoId = await insertGrupoService(
            nombre,
            provincia,
            generos,
            honorarios,
            biografia,
            req.user.id,
            rider,
            email
        );

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

export default createGrupoController;
