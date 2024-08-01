import getPool from '../../database/getPool.js';

const selectSalaByIdService = async (idSala) => {
    const pool = await getPool();

    // Consulta para obtener la sala y la información relacionada, incluyendo el avatar del usuario
    const [entry] = await pool.query(
        `
            SELECT 
                S.id,
                S.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = S.provincia) AS provincia,
                (SELECT id FROM provincias WHERE provincias.id = S.provincia) AS provinciaId,
                (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = S.generos) AS genero,
                (SELECT id FROM generos_musicales WHERE generos_musicales.id = S.generos) AS generoId,
                S.direccion,
                S.precios,
                S.capacidad,
                S.descripcion,
                S.equipamiento,
                S.condiciones,
                S.horaReservasStart,
                S.horaReservasEnd,
                (SELECT email FROM usuarios WHERE usuarios.id = S.usuario_id) AS email,
                U.avatar AS usuarioAvatar, -- Agregamos el avatar del usuario aquí
                S.createdAt,
                AVG(IFNULL(V.voto, 0)) AS votos
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

    // Obtenemos el array de los comentarios de la sala
    const [comentarios] = await pool.query(
        `
            SELECT
                votos_salas.comentario,
                votos_salas.voto,
                votos_salas.createdAt,
                votos_salas.id,
                grupos.id AS grupoVotaId,
                grupos.nombre AS grupoVotaName,
                usuarios.avatar AS grupoAvatar
            FROM votos_salas
            JOIN grupos ON grupos.id = votos_salas.grupoVota
            JOIN usuarios ON usuarios.id = grupos.usuario_id
            WHERE votos_salas.salaVotada = ?
        `,
        [idSala]
    );

    // Agregamos el array de los media del grupo.
    entry[0].comentarios = comentarios;

    // Fetch photos and reservations
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
            LEFT JOIN Grupos G ON G.id = R.grupo_id
            WHERE R.sala_id = ?
        `,
        [idSala]
    );

    return {
        ...entry[0],
        comentarios,
        photos,
        reservations,
    };
};

export default selectSalaByIdService;
