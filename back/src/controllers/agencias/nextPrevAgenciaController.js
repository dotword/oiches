import nextPrevAgenciaService from '../../services/agencias/nextPrevAgenciaService.js';

const nextPrevAgenciaController = async (req, res, next) => {
    const { idAgencia } = req.params;
    try {
        const agenciasNavigator = await nextPrevAgenciaService(idAgencia);

        res.status(200).send(agenciasNavigator);
    } catch (error) {
        next(error);
    }
};

export default nextPrevAgenciaController;
