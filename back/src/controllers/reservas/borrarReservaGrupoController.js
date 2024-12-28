import borrarReservaGrupoService from '../../services/reservas/borrarReservaGrupoService.js';
const borrarReservaGrupoController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { reserva_id } = req.params;

        await borrarReservaGrupoService(id, reserva_id);

        res.status(200).json({
            message: 'Se ha borrado la reserva con éxito ',
        });
    } catch (error) {
        next(error);
    }
};
export default borrarReservaGrupoController;
