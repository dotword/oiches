import aprobarReservaService from '../../services/reservas/aprobarReservaService.js';

const aprobarReservaController = async (req, res, next) => {
    try {
        const { reserva_id } = req.params;
        const { token } = req.headers;

        await aprobarReservaService(token, reserva_id);

        res.status(200).json({
            message: 'Se ha modificado tu reserva.',
        });
    } catch (error) {
        next(error);
    }
};

export default aprobarReservaController;
