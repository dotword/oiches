import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getOwnUserController = async (req, res, next) => {
    try {
        const user = await selectUserByIdService(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getOwnUserController;
