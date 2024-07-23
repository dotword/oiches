// Importamos los modelos.
import salaCanVoteService from '../services/middleware/salaCanVoteService.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const salaCanVote = async (req, res, next) => {
    try {
        // Obtenemos el id la reserva.
        const { idReserva } = req.params;
        const userId = req.user.id;

        await salaCanVoteService(idReserva, userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default salaCanVote;
