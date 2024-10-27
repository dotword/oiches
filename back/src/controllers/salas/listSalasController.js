import { listSalasService } from '../../services/salas/listSalasService.js';

const listSalasController = async (req, res, next) => {
    try {
        const filters = {
            nombre: req.query.nombre || '',
            genero: req.query.genero || '',
            provincia: req.query.provincia || '',
            field: ['media_votos', 'updatedAt'],
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 12,
        };

        const salas = await listSalasService(filters);
        res.status(200).send(salas);
    } catch (error) {
        next(error);
    }
};

export default listSalasController;
