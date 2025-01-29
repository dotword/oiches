import concertExistsService from '../services/middleware/concertExistsService.js';

const concertExits = async (req, res, next) => {
    try {
        // Obtenemos el id de la sala de los path params.
        const { conciertoId } = req.params;

        await concertExistsService(conciertoId);

        next();
    } catch (error) {
        next(error);
    }
};

export default concertExits;
