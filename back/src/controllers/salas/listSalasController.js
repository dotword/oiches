import { listSalasService } from '../../services/salas/listSalasService.js';

const listSalasController = async (req, res, next) => {
    try {
        const filters = {
            nombre: req.query.nombre || '',
            genero: req.query.genero || '',
            provincia: req.query.provincia || '',
            field: req.query.sortField || 'media_votos', // Default sort field
            order: req.query.order || 'DESC',
            page:req.query.page || 1,
            pageSize:req.query.pageSize || 8
        };

     

        const salas = await listSalasService(filters);
        console.log(salas);
        res.status(200).send(salas);
    } catch (error) {
        next(error);
    }
};

export default listSalasController;
