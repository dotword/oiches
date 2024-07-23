import grupoExistsService from '../services/middleware/grupoExistsService.js';

const grupoExists = async (req, res, next) => {
    try {
        // Obtenemos el id del grupo de los path params.
        const { idGrupo } = req.params;

        await grupoExistsService(idGrupo);

        next();
    } catch (error) {
        next(error);
    }
};

export default grupoExists;
