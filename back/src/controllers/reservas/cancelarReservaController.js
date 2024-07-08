import { cancelarReservaService } from '../../services/reservas/cancelarReservaService.js';
const cancelarReservaController = async (req, res, next) => {
    try {
        const { token } = req.headers;
        const reserva_id = req.params;

        await cancelarReservaService(token, reserva_id);

        res.status(200).json({
            message: 'Se ha borrado la reserva con exito ',
        });
    } catch (error) {
        next(error);
    }
};
export default cancelarReservaController;
