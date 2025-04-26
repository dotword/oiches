import validateVoterEmailTokenService from '../../services/concurso/validateVoterEmailTokenService.js';

const validateVoterEmailTokenController = async (req, res, next) => {
    try {
        const verification_token =
            req.params.verification_token || req.body.verification_token;

        if (!verification_token) {
            return res.status(400).send({
                status: 'error',
                message: 'El código de verificación es requerido',
            });
        }

        await validateVoterEmailTokenService(verification_token);

        res.send({
            status: 'ok',
            message: 'Email verificado correctamente. Ya puedes votar',
        });
    } catch (error) {
        next(error);
    }
};

export default validateVoterEmailTokenController;
