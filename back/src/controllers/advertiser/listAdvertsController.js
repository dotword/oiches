import listAdvertsService from '../../services/advertisers/listAdvertsService.js';

const listAdvertsController = async (req, res, next) => {
    try {
        const filters = {
            title: (req.query.title || '').trim(),
            package: (req.query.package || '').trim(),
            companyName: (req.query.companyName || '').trim(),
            status: req.query.status || '',
            userActive: req.query.userActive || '',
            expired: req.query.expired || '',
            orderField: req.query.orderField || 'fecha',
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 25,
        };
        const adverts = await listAdvertsService(filters);

        res.send({
            status: 'ok',
            adverts,
        });
    } catch (error) {
        next(error);
    }
};

export default listAdvertsController;
