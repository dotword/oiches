import borrarVotoAdminService from '../../services/concurso/borrarVotoAdminService.js';

const borrarVotoAdminController = async (req, res, next) => {
    try {
        const { idVoto } = req.params;

        await borrarVotoAdminService(idVoto);

        res.status(200).json({
            message: 'Se ha borrado el voto con éxito ',
        });
    } catch (error) {
        next(error);
    }
};

export default borrarVotoAdminController;
