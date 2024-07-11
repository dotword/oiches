import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import { uploadFiles } from '../../utils/uploadFiles.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import addSalaPhotoSchema from '../../schemas/salas/addSalaPhotoSchema.js';

const addGrupoPhotoController = async (req, res, next) => {
    try {
        // Obtenemos el id del grupo de los path params.
        const { idGrupo } = req.params;

        // Validamos con JOI
        // await validateSchemaUtil(addSalaPhotoSchema, req.files || {});

        // Obtenemos la información del grupo
        // const grupo = await selectSalaByIdService(idGrupo);

        // Si el grupo tiene más de 4 fotos lanzamos un error.
        // if (sala.photos.length > 3)
        //     throw generateErrorsUtil(
        //         'No se pueden subir más de 4 fotos a la sala',
        //         409
        //     );
        // Si el grupo tiene más de 1 pdf lanzamos un error.

        // Guardamos la foto en la carpeta uploads y obtenemos su nombre.
        const photoName = await uploadFiles(req.files.photo);

        console.log('photoName ', photoName);

        // Guardamos la foto en la base de datos y obtenemos el id de la misma.
        // await insertSalaPhotoService(photoName, idSala);

        res.send({
            status: 'ok',
            message: 'Imagen subida correctamente',
            // data: {
            //     photo: {
            //         name: photoName,
            //     },
            // },
        });
    } catch (error) {
        next(error);
    }
};

export default addGrupoPhotoController;
