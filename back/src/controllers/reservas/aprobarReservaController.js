import aprobarReservaService from '../../services/reservas/aprobarReservaService.js';

const aprobarReservaController = async (req, res, next) => {
    try {
        const { reserva_id } = req.params;
        // FALTA VALIDACION POR JOI

        await aprobarReservaService(reserva_id);

        res.status(200).json({
            message: 'Se ha aprovado la reserva ',
        });
    } catch (error) {
        next(error);
    }
};

export default aprobarReservaController;
