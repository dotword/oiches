import noticeExistsService from '../services/middleware/noticeExistsService.js';

const noticeExists = async (req, res, next) => {
    try {
        const { idNotice } = req.params;

        await noticeExistsService(idNotice);

        next();
    } catch (error) {
        next(error);
    }
};

export default noticeExists;
