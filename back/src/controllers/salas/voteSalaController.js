import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import insertVoteSalaService from '../../services/salas/insertVoteSalaService.js';
import insertCommentSalaService from '../../services/salas/insertSalaCommentService.js';
import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';

const voteSalaController = async (req, res, next) => {
    try {
        const { idSala } = req.params;
        const { value, comment } = req.body;
        const { id: userId } = req.user; // Extraemos el ID

        if (value <= 0 || value > 5) {
            throw generateErrorsUtil('El valor debe ser entre 1 y 5', 409);
        }

        const sala = await selectSalaByIdService(idSala);
        if (!sala) {
            throw generateErrorsUtil('Sala no encontrada', 404);
        }

        if (sala.usuario_id === userId) {
            throw generateErrorsUtil('No se puede votar su propia entrada', 403);
        }

        // Insertamos votos 
        const avgVotes = await insertVoteSalaService(value, idSala, userId);

        // Insertamos comentarios
        if (comment && comment.trim()) {
            await insertCommentSalaService(comment, idSala, userId);
        }

        res.send({
            status: 'ok',
            data: avgVotes,
        });
    } catch (error) {
        next(error);
    }
};

export default voteSalaController;
