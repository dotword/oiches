import selectSalasVotosService from '../../services/salas/selectSalasVotosService.js';

const getSalaVotosController = async (req, res, next) => {
    try {
        const { idSala } = req.params;
        console.log('controlleId ', idSala);

        const salaVotos = await selectSalasVotosService(idSala, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                salaVotos,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getSalaVotosController;
