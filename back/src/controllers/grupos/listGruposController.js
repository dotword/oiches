import { listGruposService } from '../../services/grupos/listGruposService.js';

export async function listGruposController(req, res, next) {
    try {
        const filters = {
            nombre: req.query.nombre,
            provincia: req.query.provincia,
            generos: req.query.generos,
            honorarios: req.query.honorarios,
        };

        const sort = {
            field: req.query.sortField,
            order: req.query.sortOrder,
        };

        const grupos = await listGruposService(filters, sort);
        res.status(200).send(grupos);
    } catch (error) {
        next(error);
    }
}
