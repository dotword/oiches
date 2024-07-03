import aprobarReservaService from '../../services/reservas/aprobarReservaService.js';

const aprobarReservaController = async (req, res, next) => {
    try {
        const { reserva_id } = req.params;
        const { id } = req.user;

        await aprobarReservaService(reserva_id, id);

        res.status(200).json({
            message: 'Se ha modificado tu reserva. Revisa tu email.',
        });
    } catch (error) {
        next(error);
    }
};

export default aprobarReservaController;
