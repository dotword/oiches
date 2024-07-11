// Importamos los modelos.
import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import { deleteFiles } from '../../utils/uploadFiles.js';
import deleteSalaPhotoService from '../../services/salas/deleteSalaPhotoService.js';

// Función controladora final que elimina una foto de una entrada.
const deleteSalaPhotoController = async (req, res, next) => {
    try {
        // Obtenemos el id de al entrada y el id de la foto de los path params.
        const { idSala, photoId } = req.params;

        // Obtenemos los detalles de la entrada.
        const sala = await selectSalaByIdService(idSala);

        // Variable que almacenará la foto que queremos eliminar.
        const photo = sala.photos.find((photo) => photo.id === photoId);
        // console.log('photoId ', photoId);
        // console.log('photo name ', photo.name);

        // Si la foto no existe en el array de fotos de la entrada lanzamos un error.
        if (!photo)
            throw generateErrorsUtil(`La imagen '${photoId}' no existe`, 404);

        // Borramos la foto de la carpeta de subida de archivos.
        await deleteFiles(photo.name);

        // Borramos la foto de la base de datos.
        await deleteSalaPhotoService(photoId);

        res.send({
            status: 'ok',
            message: 'Foto eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteSalaPhotoController;
