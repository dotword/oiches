import listMyOwnAdvertsService from '../../services/advertisers/listMyOwnAdvertsService.js';

const listMyOwnAdvertsController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const adverts = await listMyOwnAdvertsService(userId);

        res.send({
            status: 'ok',
            adverts,
        });
    } catch (error) {
        next(error);
    }
};

export default listMyOwnAdvertsController;
