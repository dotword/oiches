import tramitarReservaService from '../../services/reservas/tramitarReservaService.js';

const tramitarReservaController = async (req, res, next) => {
    try {
        const { reserva_id } = req.params;

        await tramitarReservaService(reserva_id);

        res.send({
            status: 'ok',
            message: 'Se ha aprobado la reserva',
        });
    } catch (error) {
        next(error);
    }
};

export default tramitarReservaController;
