import getAllNoticesService from '../../services/admin/getAllNoticesService.js';

const getAllNoticesController = async (req, res, next) => {
    try {
        const filters = {
            estado: req.query.estado || '',
            orderField: req.query.orderField || 'fecha',
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 25,
        };

        const notices = await getAllNoticesService(filters);

        res.send({
            status: 'ok',
            notices,
        });
    } catch (error) {
        next(error);
    }
};

export default getAllNoticesController;
