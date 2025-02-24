import listAllReservaService from '../../services/admin/listAllReservaService.js';

const listAllReservasController = async (req, res, next) => {
    try {
        const filters = {
            name: req.query.name || '',
            confirm: req.query.confirm || '',
            orderField: req.query.orderField || 'fecha',
            order: req.query.order || 'ASC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 25,
        };

        const reservas = await listAllReservaService(filters);

        res.send({
            status: 'ok',
            data: {
                reservas,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listAllReservasController;
