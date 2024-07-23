import hasOneGroupService from '../services/middleware/hasOneGroupService.js';

const hasOneGroup = async (req, res, next) => {
    try {
        // Obtenemos el id del grupo de los path params.
        const userId = req.user.id;

        await hasOneGroupService(userId);

        next();
    } catch (error) {
        next(error);
    }
};

export default hasOneGroup;
