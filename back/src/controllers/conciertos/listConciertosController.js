import listConciertosService from '../../services/conciertos/listConciertosService.js';

const listConciertosController = async (req, res, next) => {
    try {
        const filters = {
            provincia: req.query.provincia || '',
            ciudad: req.query.ciudad || '',
            generos: req.query.generos || '',
            fecha: req.query.fecha || '',
            fechaHasta: req.query.fechaHasta || '',
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 12,
        };

        const conciertos = await listConciertosService(filters);
        res.status(200).send(conciertos);
    } catch (error) {
        next(error);
    }
};

export default listConciertosController;
