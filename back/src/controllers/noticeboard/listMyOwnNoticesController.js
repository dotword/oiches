import listMyOwnNoticesService from '../../services/noticeboard/listMyOwnNoticesService.js';

const listMyOwnNoticesController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const notices = await listMyOwnNoticesService(userId);

        res.send({
            status: 'ok',
            notices,
        });
    } catch (error) {
        next(error);
    }
};

export default listMyOwnNoticesController;
