import { listGruposService } from '../../services/grupos/listGruposService.js';

const listGruposController = async (req, res, next) => {
    try {
        const filters = {
            nombre: req.query.nombre || '',
            provincia: req.query.provincia || '',
            generos: req.query.generos || '',
            field: req.query.sortField || 'media_votos', // Default sort field
            order: req.query.order || 'DESC', 
        };



        const grupos = await listGruposService(filters);
        res.status(200).send(grupos);
    } catch (error) {
        next(error);
    }
};

export default listGruposController;
