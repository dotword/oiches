import insertVoteSalaService from '../../services/salas/insertVoteSalaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import votosSchema from '../../schemas/votosSchema.js';

const voteSalaController = async (req, res, next) => {
    try {
        const { idReserva } = req.params;
        const { voto, comment } = req.body;

        // Validar con JOI
        await validateSchemaUtil(votosSchema, Object.assign(req.body));

        await insertVoteSalaService(voto, comment, idReserva);

        res.send({
            status: 'ok',
            data: {
                voto,
                comment,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default voteSalaController;
