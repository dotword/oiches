import cancelarReservaSalaService from '../../services/reservas/cancelarReservaSalaService.js';

const cancelarReservaSalaController = async (req, res, next) => {
    try {
        const { token } = req.headers;
        const { reserva_id } = req.params;

        await cancelarReservaSalaService(token, reserva_id);

        res.status(200).json({
            message: 'Se ha borrado la reserva con exito ',
        });
    } catch (error) {
        next(error);
    }
};

export default cancelarReservaSalaController;
