import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';

const insertVoteSalaService = async (voto, comment, idReserva) => {
    const pool = await getPool();

    // Generamos el id.
    const votosId = uuid();

    // Obtener el id de la sala y del grupo
    const [reservasIds] = await pool.query(
        `SELECT sala_id, grupo_id FROM reservas WHERE id = ?`,
        [idReserva]
    );

    await pool.query(
        `
        INSERT INTO votos_salas (id, voto, comentario, reservaId, grupoVota, salaVotada) VALUES
        (?, ?, ?, ?, ?, ?)
    `,
        [
            votosId,
            voto,
            comment,
            idReserva,
            reservasIds[0].grupo_id,
            reservasIds[0].sala_id,
        ]
    );
};

export default insertVoteSalaService;
