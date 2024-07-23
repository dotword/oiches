import checkIfSalaService from '../services/middleware/checkIfSalaService.js';

const checkIfSala = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await checkIfSalaService(userId);

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default checkIfSala;
