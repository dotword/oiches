import aprobarReservaService from '../../services/reservas/aprobarReservaService.js';

const aprobarReservaController = async (req, res, next) => {
    try {
        const { reserva_id } = req.params;

        await aprobarReservaService(reserva_id);

        res.send({
            status: 'ok',
            message: '¡El concierto está confirmado!',
        });
    } catch (error) {
        next(error);
    }
};

export default aprobarReservaController;
