import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import { uploadFiles } from '../../utils/uploadFiles.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import addSalaPhotoSchema from '../../schemas/salas/addSalaPhotoSchema.js';

const addSalaPhotoController = async (req, res, next) => {
    try {
        // Obtenemos el id de la sala de los path params.
        const { idSala } = req.params;

        // Validamos con JOI
        await validateSchemaUtil(addSalaPhotoSchema, req.files || {});

        // Obtenemos la información de la sala para comprobar si somos los propietarios.
        const sala = await selectSalaByIdService(idSala);

        // Si la sala tiene más de 4 fotos lanzamos un error.
        if (sala.photos.length > 3)
            throw generateErrorsUtil(
                'No se pueden subir más de 4 fotos a la sala',
                409
            );

        // Guardamos la foto en la carpeta uploads, redimensionamos a un ancho de 600px y obtenemos su nombre.
        const photoName = await uploadFiles(req.files.photo, 600);

        // Guardamos la foto en la base de datos y obtenemos el id de la misma.
        await insertSalaPhotoService(photoName, idSala);

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

export default addSalaPhotoController;
