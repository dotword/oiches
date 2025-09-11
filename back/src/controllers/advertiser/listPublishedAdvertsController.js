import listPublishedAdvertsService from '../../services/advertisers/listPublishedAdvertsService.js';

const listPublishedAdvertsController = async (req, res, next) => {
    try {
        const allowedOrderFields = ['fecha', 'title', 'provincia', 'category'];
        const rawOrderField = (req.query.orderField || '').trim();
        const orderField = allowedOrderFields.includes(rawOrderField)
            ? rawOrderField
            : 'title'; // por defecto title (A -> Z)

        let rawOrder = (req.query.order || '').toUpperCase();
        const order = rawOrder === 'DESC' ? 'DESC' : 'ASC'; // por defecto ASC (A -> Z)

        const filters = {
            title: (req.query.title || '').trim(),
            category: req.query.category || '',
            provincia: req.query.provincia || '',
            city: (req.query.city || '').trim(),
            orderField,
            order,
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 6,
        };
        const adverts = await listPublishedAdvertsService(filters);

        res.send({
            status: 'ok',
            adverts,
        });
    } catch (error) {
        next(error);
    }
};

export default listPublishedAdvertsController;
