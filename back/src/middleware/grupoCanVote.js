// Importamos los modelos.
import grupoCanVoteService from '../services/middleware/grupoCanVoteService.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const grupoCanVote = async (req, res, next) => {
    try {
        // Obtenemos el id la reseva.
        const { idReserva } = req.params;
        const userId = req.user.id;

        await grupoCanVoteService(idReserva, userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default grupoCanVote;
