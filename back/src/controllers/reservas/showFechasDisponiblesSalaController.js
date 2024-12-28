import showFechasDisponiblesService from '../../services/reservas/showFechasDisponiblesService.js';

const showFechasDisponiblesSalaController = async (req, res, next) => {
    const { idSala } = req.params;

    try {
        const result = await showFechasDisponiblesService(idSala);

        res.send({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

export default showFechasDisponiblesSalaController;
