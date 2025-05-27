import adminListContestVotersService from '../../services/concurso/adminListContestVotersService.js';

const adminListContestVotersController = async (req, res, next) => {
    try {
        const filters = {
            email: req.query.email || '',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 50,
        };

        const voters = await adminListContestVotersService(filters);

        res.send({
            status: 'ok',
            voters,
        });
    } catch (error) {
        next(error);
    }
};

export default adminListContestVotersController;
