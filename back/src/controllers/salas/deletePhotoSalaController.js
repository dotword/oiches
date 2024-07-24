import { deleteFiles } from '../../utils/uploadFiles.js';
import deleteSalaPhotoService from '../../services/salas/deleteSalaPhotoService.js';

const deletePhotoSalaController = async (req, res, next) => {
    try {
        const { photoName, deletePhoto } = req.params;

        const deleted = photoName;

        // Borramos la foto de la carpeta de subida de archivos.
        await deleteFiles(deleted);
        await deleteSalaPhotoService(deletePhoto);

        res.send({
            status: 'ok',
            message: 'Foto borrada',
        });
    } catch (error) {
        next(error);
    }
};

export default deletePhotoSalaController;
