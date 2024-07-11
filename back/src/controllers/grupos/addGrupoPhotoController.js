import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import { uploadFiles } from '../../utils/uploadFiles.js';
import insertGrupoPhotoService from '../../services/grupos/insertGrupoPhotoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import addGrupoPhotoSchema from '../../schemas/grupos/addGrupoPhotoSchema.js';

const addGrupoPhotoController = async (req, res, next) => {
    try {
        // Obtenemos el id del grupo de los path params.
        const { idGrupo } = req.params;

        // Validamos con JOI
        await validateSchemaUtil(addGrupoPhotoSchema, req.files || {});

        // Obtenemos la información del grupo
        const grupo = await selectGrupoByIdService(idGrupo);

        // Si el grupo tiene más de 5 archivos lanzamos un error.
        if (grupo.photos.length > 4)
            throw generateErrorsUtil(
                'No se pueden subir más de 5 archivos al grupo',
                409
            );

        // Guardamos la foto en la carpeta uploads y obtenemos su nombre.
        const photoName = await uploadFiles(req.files.photo);

        // Guardamos la foto en la base de datos y obtenemos el id de la misma.
        await insertGrupoPhotoService(photoName, idGrupo);

        res.send({
            status: 'ok',
            data: {
                photo: {
                    name: photoName,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default addGrupoPhotoController;
