import aprobarReservaService from '../../services/reservas/aprobarReservaService.js';

const aprobarReservaController = async (req, res, next) => {
    try {
        const { token } = req.headers;
        const reserva_id = req.params;

        await aprobarReservaService(token, reserva_id);

        res.status(200).json({
            message: 'Se ha borrado la reserva con exito ',
        });
    } catch (error) {
        next(error);
    }
};

export default aprobarReservaController;
