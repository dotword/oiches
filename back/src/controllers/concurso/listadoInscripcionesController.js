import listadoInscripcionesService from '../../services/concurso/listadoInscripcionesService.js';

const listadoInscripcionesController = async (req, res, next) => {
    try {
        const filters = {
            name: req.query.name || '',
            acepted: req.query.acepted || '',
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 25,
        };

        const inscripciones = await listadoInscripcionesService(filters);

        res.send({
            status: 'ok',
            inscripciones,
        });
    } catch (error) {
        next(error);
    }
};

export default listadoInscripcionesController;
