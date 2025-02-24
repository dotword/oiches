import checkAgenciaService from '../services/middleware/checkIfAgenciaService.js';

const checkIfAgencia = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await checkAgenciaService(userId);

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default checkIfAgencia;
