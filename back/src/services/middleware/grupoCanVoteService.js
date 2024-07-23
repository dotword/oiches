import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const grupoCanVoteService = async (idReserva, userId) => {
    const pool = await getPool();

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
            'No puedes votar a una sala en la que aún no tocaste',
            404
        );
    }

    // Comprobar que el usuario tenga ese grupo
    const [grupoOwner] = await pool.query(
        `SELECT id FROM grupos WHERE usuario_id = ?`,
        [userId]
    );

    if (grupoOwner[0].id !== reserva[0].grupo_id)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );

    // Comprobar que el grupo no haya votado antes a la sala
    const [hasVoted] = await pool.query(
        `SELECT salaVotada FROM votos_salas WHERE grupoVota = ?`,
        [reserva[0].grupo_id]
    );

    if (hasVoted[0]) throw generateErrorsUtil('Ya has votado a esta sala', 409);
};

export default grupoCanVoteService;
