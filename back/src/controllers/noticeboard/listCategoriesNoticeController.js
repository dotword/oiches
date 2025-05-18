import listCategoriesNoticeService from '../../services/noticeboard/listCategoriesNoticeService.js';

const listCategoriesNoticeController = async (req, res, next) => {
    try {
        const categorias = await listCategoriesNoticeService();
        res.send({
            status: 'ok',
            categorias,
        });
    } catch (error) {
        next(error);
    }
};

export default listCategoriesNoticeController;
