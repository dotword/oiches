import salaExistsService from '../services/middleware/salaExistsService.js';

const salaExists = async (req, res, next) => {
    try {
        // Obtenemos el id de la sala de los path params.
        const { idSala } = req.params;

        await salaExistsService(idSala);

        next();
    } catch (error) {
        next(error);
    }
};

export default salaExists;
