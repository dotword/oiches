import { listSalasService } from '../../services/salas/listSalasService.js';

export async function listSalasController(req, res, next) {
    try {
        const filters = {};
        for (const key in req.query) {
            filters[key] = req.query[key];
        }

        const sort = {
            field: req.query.sortField,
            order: req.query.sortOrder,
        };

        const salas = await listSalasService(filters, sort);
        res.status(200).json(salas);
    } catch (error) {
        next(error);
    }
}
