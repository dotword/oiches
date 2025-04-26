import registerVoterVoteService from '../../services/concurso/registerVoterVoteService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import loginUserSchema from '../../schemas/users/sendRecoverPass.js';

const registerVoterVoteController = async (req, res, next) => {
    try {
        const { idProyecto } = req.params;
        const { email } = req.body;

        // Validar con JOI
        await validateSchemaUtil(loginUserSchema, Object.assign(req.body));

        const result = await registerVoterVoteService(idProyecto, email);

        res.send({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

export default registerVoterVoteController;
