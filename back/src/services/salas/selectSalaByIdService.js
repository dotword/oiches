import getPool from '../../database/getPool.js';

const selectSalaByIdService = async (idSala) => {
    const pool = await getPool();
    const [entry] = await pool.query(
        `
            SELECT 
                S.id,
                S.usuario_id,
                S.nombre,
                S.direccion,
                S.email,
                S.precios,
                S.capacidad,
                S.descripcion,
                S.equipamiento,
                S.condiciones,
                AVG(IFNULL(V.value, 0)) AS votes,
                GM.nombre AS genero,
                P.provincia AS provincia,
                S.createdAt
            FROM Salas S
            LEFT JOIN votos_salas V ON V.sala_id = S.id           
            INNER JOIN usuarios U ON U.id = S.usuario_id
            LEFT JOIN generos_salas GS ON GS.salaId = S.id           
            LEFT JOIN generos_musicales GM ON GM.id = GS.id
            LEFT JOIN provincias_salas PS ON PS.salaId = S.id           
            LEFT JOIN provincias P ON P.id = PS.id    
            WHERE S.id = ?
            GROUP BY GM.nombre, P.provincia
        `,
        [idSala]
    );
    // Obtenemos el array de fotos de la entrada.
    const [photos] = await pool.query(
        `SELECT id, name FROM sala_fotos WHERE salaId = ?`,
        [idSala]
    );
    // Agregamos el array de fotos a la entrada.
    entry[0].photos = photos;

    // Obtenemos el array de los comentarios de la sala.
    const [comments] = await pool.query(
        `SELECT descripcion, grupo_id FROM sala_comments WHERE sala_id = ?`,
        [idSala]
    );
    // Agregamos el array de los comentarios de la sala.
    entry[0].comments = comments;

    // Obtenemos el array de las reservas de la sala.
    const [reservations] = await pool.query(
        `
            SELECT
                R.nombre,
                R.grupo_id,
                G.nombre AS grupo,
                R.fecha,
                R.hora,
                R.confirmada
            FROM Reservas R
            LEFT JOIN Grupos G ON G.id= R.grupo_id 
            WHERE sala_id = ?
        `,
        [idSala]
    );
    // Agregamos el array de las reservas de la sala.
    entry[0].reservations = reservations;

    return {
        entry,
    };
};

export default selectSalaByIdService;
