import cambiarFechaReservaService from '../../services/reservas/cambiarFechaReservaService.js';

const cambiarFechaReservaController = async (req, res, next) => {
    try {
        const { reserva_id } = req.params;

        const { fecha } = req.body;

        await cambiarFechaReservaService(reserva_id, fecha);

        res.send({
            status: 'ok',
            message:
                'Fecha modificada. El músico recivirá un email con la nueva fecha.',
        });
    } catch (error) {
        next(error);
    }
};

export default cambiarFechaReservaController;
