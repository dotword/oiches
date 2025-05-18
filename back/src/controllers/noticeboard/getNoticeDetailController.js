import selectNoticeByIdService from '../../services/noticeboard/selectNoticeByIdService.js';

const getNoticeDetailController = async (req, res, next) => {
    try {
        const { idNotice } = req.params;

        const notice = await selectNoticeByIdService(idNotice, req.user?.id);

        res.send({
            status: 'ok',
            notice,
        });
    } catch (error) {
        next(error);
    }
};

export default getNoticeDetailController;
