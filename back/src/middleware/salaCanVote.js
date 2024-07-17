// Importamos los modelos.
import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const salaCanVote = async (req, res, next) => {
    try {
        const pool = await getPool();
        // Obtenemos el id la reserva.
        const { idReserva } = req.params;
        const userId = req.user.id;

        // Comprobar que la reserva existe, esté confirmada y que la fecha de reserva ya pasó
        const [reserva] = await pool.query(
            `
                SELECT * FROM reservas WHERE id=? AND reservas.confirmada=?
            `,
            [idReserva, 1]
        );

        if (!reserva.length) {
            throw generateErrorsUtil(
                'La reserva que intentas votar no está confirmada o no existe',
                400
            );
        }

        // Comprobar que la fecha de la reserva es anterior a hoy
        const dateReserva = new Date(reserva[0].fecha);

        if (dateReserva > new Date()) {
            throw generateErrorsUtil(
                'No puedes votar a un grupo que no tocó en tu sala',
                404
            );
        }

        // Comprobar que el usuario tenga esa sala
        const [salaOwner] = await pool.query(
            `SELECT id FROM salas WHERE usuario_id = ?`,
            [userId]
        );

        if (salaOwner[0].id !== reserva[0].sala_id)
            throw generateErrorsUtil(
                'El usuario no está autorizado para hacer esta operación',
                409
            );

        // Comprobar que la sala no haya votado antes al grupo
        const [hasVoted] = await pool.query(
            `SELECT grupoVotado FROM votos_grupos WHERE salaVota = ?`,
            [reserva[0].sala_id]
        );

        if (hasVoted[0])
            throw generateErrorsUtil('Ya has votado a este grupo', 409);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default salaCanVote;
