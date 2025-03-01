import listNoticesService from '../../services/noticeboard/listNoticesService.js';

const listNoticesController = async (req, res, next) => {
    try {
        const filters = {
            categoria: req.query.categoria || '',
            provincia: req.query.provincia || '',
            generos: req.query.generos || '',
            ownerRole: req.query.ownerRole || '',
            orderField: req.query.orderField || 'fecha',
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 25,
        };

        const notices = await listNoticesService(filters);

        res.send({
            status: 'ok',
            notices,
        });
    } catch (error) {
        next(error);
    }
};

export default listNoticesController;
