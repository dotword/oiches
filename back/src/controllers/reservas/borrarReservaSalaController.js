import borrarReservaSalaService from '../../services/reservas/borrarReservaSalaService.js';

const borrarReservaSalaController = async (req, res, next) => {
    try {
        const { token } = req.headers;
        const { reserva_id } = req.params;

        await borrarReservaSalaService(token, reserva_id);

        res.status(200).json({
            message: 'Se ha borrado la reserva con exito ',
        });
    } catch (error) {
        next(error);
    }
};

export default borrarReservaSalaController;
