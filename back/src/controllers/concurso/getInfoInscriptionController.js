import getInfoInscriptionService from '../../services/concurso/getInfoInscriptionService.js';

const getInfoInscriptionController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const inscription = await getInfoInscriptionService(idGrupo);
        res.send({
            status: 'ok',
            inscription,
        });
    } catch (error) {
        next(error);
    }
};

export default getInfoInscriptionController;
