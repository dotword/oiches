// Importamos los modelos.
import canEditReservaService from '../services/middleware/canEditReservaService.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditReserva = async (req, res, next) => {
    try {
        // Obtenemos el id de la reserva en la cuál tendra lugar el cambio.
        const { reserva_id } = req.params;
        const userId = req.user.id || req.params.usuario_id;

        await canEditReservaService(reserva_id, userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditReserva;
