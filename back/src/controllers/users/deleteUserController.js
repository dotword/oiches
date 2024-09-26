import { deleteUserService } from '../../services/users/deleteUserService.js';

export const deleteUserController = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await deleteUserService(userId);

        res.status(200).json({
            message: 'El usuario se ha eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
