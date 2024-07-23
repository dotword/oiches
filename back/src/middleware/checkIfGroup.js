import checkIfGroupService from '../services/middleware/checkIfGroupService.js';

const checkIfGroup = async (req, res, next) => {
    try {
        const currentUser = req.user;

        await checkIfGroupService(currentUser);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default checkIfGroup;
