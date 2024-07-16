import getPool from '../../database/getPool.js';

const selectSalaByIdService = async (idSala) => {
    const pool = await getPool();
    const [entry] = await pool.query(
        `
            SELECT 
                S.id,
                S.usuario_id,
                S.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = S.provincia) AS provincia,
                (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = S.generos) AS genero,
                S.direccion,
                S.precios,
                S.capacidad,
                S.descripcion,
                S.equipamiento,
                S.condiciones,
                S.horaReservasStart,
                S.horaReservasEnd,
                AVG(IFNULL(V.voto, 0)) AS votes,
                (SELECT comentario FROM votos_salas WHERE votos_salas.salaVotada = S.id) AS comentario,
                S.createdAt
            FROM Salas S
            LEFT JOIN votos_salas V ON V.salaVotada = S.id           
            INNER JOIN usuarios U ON U.id = S.usuario_id
            WHERE S.id = ?
            GROUP BY S.id
        `,
        [idSala]
    );

    if (entry.length === 0) {
        return null;
    }

    // Fetch photos, comments, and reservations
    const [photos] = await pool.query(
        `SELECT id, name FROM sala_fotos WHERE salaId = ?`,
        [idSala]
    );
    const [reservations] = await pool.query(
        `
            SELECT
                R.grupo_id,
                G.nombre AS grupo,
                R.fecha,
                R.horaInicio,
                R.horaFin,
                R.confirmada
            FROM Reservas R
            LEFT JOIN Grupos G ON G.id= R.grupo_id
            WHERE sala_id = ?
        `,
        [idSala]
    );

    return {
        ...entry[0],
        photos,
        reservations,
    };
};

export default selectSalaByIdService;
