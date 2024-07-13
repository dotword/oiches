import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import { deleteFiles } from '../../utils/uploadFiles.js';

const deleteSalaController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

        // Obtenemos los detalles de la entrada.
        const sala = await selectSalaByIdService(idSala);
        await deleteFiles(sala.photos.name);

        res.send({
            status: 'ok',
            message: 'Sala eliminada',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteSalaController;
