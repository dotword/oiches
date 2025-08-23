import checkIfAdvertiserService from '../services/middleware/checkIfAdvertiserService.js';

const checkIfAdvertiser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await checkIfAdvertiserService(userId);

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default checkIfAdvertiser;
