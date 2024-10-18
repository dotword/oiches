import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getUserByIdController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await selectUserByIdService(userId);

        res.json(user);
    } catch (error) {
        next(error);
    }
};
export default getUserByIdController;
