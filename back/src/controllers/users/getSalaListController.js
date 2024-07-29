import getUserSalasListService from '../../services/users/getUserSalasListService.js';

const getSalaListController = async (req, res, next) => {
    try {
        const userSalas = await getUserSalasListService(req.user.id);

        res.send({
            status: 'ok',
            data: {
                userSalas,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getSalaListController;
