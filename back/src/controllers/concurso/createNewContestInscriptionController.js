import createNewContestInscriptionService from '../../services/concurso/createNewContestInscriptionService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createNewContestInscriptionController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const user = await selectUserByIdService(req.user.id);
        const userId = user[0].id;

        const { basesConfirmed } = req.body;

        const basesAccepted =
            basesConfirmed === true || basesConfirmed === 'true';

        if (!basesAccepted) {
            throw generateErrorsUtil(
                'Tienes que aceptar las bases para participar en el concurso',
                400
            );
        }

        await createNewContestInscriptionService(
            idGrupo,
            userId,
            basesConfirmed
        );

        res.send({
            status: 'ok',
            proyectoInscrito: {
                idGrupo,
                userId,
                basesConfirmed,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createNewContestInscriptionController;
