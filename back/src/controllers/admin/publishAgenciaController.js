import publishAgenciaService from '../../services/admin/publishAgenciaService.js';

const publishAgenciaController = async (req, res, next) => {
    try {
        const { idAgencia } = req.params;

        await publishAgenciaService(idAgencia);

        res.send({
            status: 'ok',
            message: 'Agencia publicada con éxito',
        });
    } catch (error) {
        next(error);
    }
};

export default publishAgenciaController;
