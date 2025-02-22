import deleteAgenciaService from '../../services/admin/deleteAgenciaService.js';

const deleteAgenciaController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        await deleteAgenciaService(userId);

        res.status(200).json({
            message: 'El usuario se ha eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteAgenciaController;
