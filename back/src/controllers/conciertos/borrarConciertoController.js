import borrarConciertoService from '../../services/conciertos/borrarConciertoService.js';

const borrarConciertoController = async (req, res, next) => {
    try {
        const { conciertoId } = req.params;

        await borrarConciertoService(conciertoId);

        res.status(200).json({
            message: 'Se ha borrado el concierto con éxito ',
        });
    } catch (error) {
        next(error);
    }
};

export default borrarConciertoController;
