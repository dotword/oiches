import borrarReservaAdminService from '../../services/admin/borrarReservaAdminService.js';

const borrarReservaAdminController = async (req, res, next) => {
    try {
        const { reserva_id } = req.params;

        await borrarReservaAdminService(reserva_id);

        res.status(200).json({
            message: 'Se ha borrado la reserva con éxito ',
        });
    } catch (error) {
        next(error);
    }
};

export default borrarReservaAdminController;
