import deleteAgenciaService from '../../services/agencias/deleteAgenciaService.js';

const deleteAgenciaController = async (req, res, next) => {
    try {
        const { idAgencia } = req.params;
        await deleteAgenciaService(idAgencia);
        res.status(200).json({
            message: 'La agencia se ha eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteAgenciaController;
