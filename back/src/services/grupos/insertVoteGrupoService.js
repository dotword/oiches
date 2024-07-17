import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';

const insertVoteGrupoService = async (voto, comment, idReserva) => {
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
        INSERT INTO votos_grupos (id, voto, comentario, reservaId, salaVota, grupoVotado) VALUES
        (?, ?, ?, ?, ?, ?)
    `,
        [
            votosId,
            voto,
            comment,
            idReserva,
            reservasIds[0].sala_id,
            reservasIds[0].grupo_id,
        ]
    );
};

export default insertVoteGrupoService;
