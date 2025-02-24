import selectAgenciaByIdService from '../../services/agencias/selectAgenciaByIdService.js';

const getAgenciaDetailController = async (req, res, next) => {
    try {
        const { idAgencia } = req.params;

        const agencia = await selectAgenciaByIdService(idAgencia, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                agencia,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getAgenciaDetailController;
