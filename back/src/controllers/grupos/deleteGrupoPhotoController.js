// Importamos los modelos.
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import { deleteFiles } from '../../utils/uploadFiles.js';
import deleteGrupoPhotoService from '../../services/grupos/deleteGrupoPhotoService.js';

// Función controladora final que elimina una foto de una entrada.
const deleteGrupoPhotoController = async (req, res, next) => {
    try {
        // Obtenemos el id de al entrada y el id de la foto de los path params.
        const { idGrupo, fileId } = req.params;

        // Obtenemos los detalles de la entrada.
        const grupo = await selectGrupoByIdService(idGrupo);

        // Variable que almacenará la foto que queremos eliminar.
        const photo = grupo.photos.find((photo) => photo.id === fileId);

        // Si la foto no existe en el array de fotos de la entrada lanzamos un error.
        if (!photo)
            throw generateErrorsUtil(`La imagen '${fileId}' no existe`, 404);

        // Borramos la foto de la carpeta de subida de archivos.
        await deleteFiles(photo.name);

        // Borramos la foto de la base de datos.
        await deleteGrupoPhotoService(fileId);

        res.send({
            status: 'ok',
            message: 'Archivo eliminado',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteGrupoPhotoController;
