import getPool from '../../database/getPool.js';

const selectSalaByIdService = async (idSala) => {
    const pool = await getPool();
    const [entry] = await pool.query(
        `
            SELECT 
                S.id,
                S.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = S.provincia) AS provincia,
                (SELECT id FROM provincias WHERE provincias.id = S.provincia) AS provinciaId,
                (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = S.generos) AS genero,
                S.direccion,
                S.precios,
                S.capacidad,
                S.descripcion,
                S.equipamiento,
                S.condiciones,
                S.horaReservasStart,
                S.horaReservasEnd,
                (SELECT email FROM usuarios WHERE usuarios.id = S.usuario_id) AS email,
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

    // Obtenemos el array de los comentarios de la sala
    const [comentarios] = await pool.query(
        `
            SELECT
                comentario,
                voto,
                (SELECT nombre FROM grupos WHERE grupos.id = votos_salas.grupoVota) AS grupoVota
            FROM votos_salas 
            JOIN grupos ON grupos.id = votos_salas.grupoVota
            WHERE salaVotada = ?
  
        `,
        [idSala]
    );
    // Agregamos el array de los media del grupo.
    entry[0].comentarios = comentarios;

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

    if (entry.length === 0) {
        return null;
    }
    return {
        ...entry[0],
        comentarios,
        photos,
        reservations,
    };
};

export default selectSalaByIdService;
