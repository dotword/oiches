import { listSalasService } from '../../services/salas/listSalasService.js';

export async function listSalasController(req, res, next) {
    try {
        const filters = {
            name: req.query.name,
            capacity: req.query.capacity,
        };

        const sort = {
            field: req.query.sortField,
            order: req.query.sortOrder,
        };

        const salas = await listSalasService(filters, sort);
        res.json(salas);
    } catch (error) {
        next(error);
    }
}
