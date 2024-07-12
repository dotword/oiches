import generateErrorsUtil from "../../utils/generateErrorsUtil.js";
import selectSalaVotesServices from "../../services/salas/selectSalaVotesServices.js";
import insertVoteSalaService from "../../services/salas/insertVoteSalaService.js";
import insertCommentSalaService from "../../services/salas/insertSalaCommentService.js";

const voteSalaController = async (req, res, next) => {
    try {
        const { idSala } = req.params;
        const { value, comment } = req.body;
        const { id: voto_grupo_id } = req.user;  // Extracting user ID

        if (value <= 0) throw generateErrorsUtil('El valor debe ser mayor a cero', 409);
        if (value > 5) throw generateErrorsUtil('El valor debe ser menor a 5', 409);

        const sala = await selectSalaVotesServices(req, idSala);
        if (sala[0].usuario_id === voto_grupo_id) throw generateErrorsUtil('No se puede votar su propia entrada', 403);

        const avgVotes = await insertVoteSalaService(value, idSala, voto_grupo_id);

        // Insertar comentario en la tabla sala_comments
        await insertCommentSalaService(comment, idSala, voto_grupo_id);

        res.send({
            status: 'ok',
            data: avgVotes
        });
    } catch (error) {
        next(error);
    }
};

export default voteSalaController;
