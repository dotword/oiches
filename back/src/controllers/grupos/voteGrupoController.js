import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import insertVoteGrupoService from '../../services/grupos/insertVoteGrupoService.js';
import insertCommentGrupoService from '../../services/grupos/insertCommentGrupoService.js';
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';

const voteGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;
        const { value, comment } = req.body;
        const { id: userId } = req.user; // Extraemos el id de usuario


        if (value <= 0 || value > 5) {
            throw generateErrorsUtil('El valor debe ser entre 1 y 5', 409);
        }

        const grupo = await selectGrupoByIdService(idGrupo);
        if (!grupo) {
            throw generateErrorsUtil('Grupo no encontrado', 404);
        }

        if (grupo.usuario_id === userId) {
            throw generateErrorsUtil('No se puede votar su propia entrada', 403);
        }

        // Insertar voto
        const avgVotes = await insertVoteGrupoService(value, idGrupo, userId);

        // Insertar comentarios
        if (comment && comment.trim()) {
            await insertCommentGrupoService(comment, idGrupo, userId);
        }

        res.send({
            status: 'ok',
            data: avgVotes,
        });
    } catch (error) {
        next(error);
    }
};

export default voteGrupoController;
