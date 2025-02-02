import agenciaExistsService from '../services/middleware/agenciaExistsService.js';

const agenciaExists = async (req, res, next) => {
    try {
        // Obtenemos el id de la sala de los path params.
        const { idAgencia } = req.params;

        await agenciaExistsService(idAgencia);

        next();
    } catch (error) {
        next(error);
    }
};

export default agenciaExists;
