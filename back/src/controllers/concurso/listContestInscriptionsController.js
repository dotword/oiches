import listContestInscriptionsService from '../../services/concurso/listContestInscriptionsService.js';

const listContestInscriptionsController = async (req, res, next) => {
    try {
        const filters = {
            name: req.query.name || '',
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 12,
        };

        const inscripciones = await listContestInscriptionsService(filters);

        res.send({
            status: 'ok',
            inscripciones,
        });
    } catch (error) {
        next(error);
    }
};

export default listContestInscriptionsController;
