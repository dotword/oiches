import publishNoticeService from '../../services/admin/publishNoticeService.js';

const publishNoticeController = async (req, res, next) => {
    try {
        const { idNotice } = req.params;

        await publishNoticeService(idNotice);

        res.send({
            status: 'ok',
            message: 'Notice publicada con éxito',
        });
    } catch (error) {
        next(error);
    }
};

export default publishNoticeController;
