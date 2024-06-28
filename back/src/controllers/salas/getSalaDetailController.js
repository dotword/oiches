import selectSalaByIdService from '../../services/users/selectSalaByIdService.js';

const getSalaDetailController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

        const user = await selectSalaByIdService(idSala);
    } catch (error) {
        next(error);
    }
};

export default getSalaDetailController;
