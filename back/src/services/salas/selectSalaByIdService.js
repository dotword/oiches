import getPool from '../../database/getPool.js';

const selectSalaByIdService = async (idSala) => {
    const pool = await getPool();
    const [entry] = await pool.query(
        `
            SELECT 
                S.id,
                S.usuario_id,
                S.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = S.provincia) AS Provincia,
                (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = S.generos) AS Genero,
                S.direccion,
                S.email,
                S.precios,
                S.capacidad,
                S.descripcion,
                S.equipamiento,
                S.condiciones,
                AVG(IFNULL(V.value, 0)) AS votes,
                S.createdAt
            FROM Salas S
            LEFT JOIN votos_salas V ON V.sala_id = S.id           
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
    const [photos] = await pool.query(`SELECT id, name FROM sala_fotos WHERE salaId = ?`, [idSala]);
    const [comments] = await pool.query(`SELECT descripcion, grupo_id FROM sala_comments WHERE sala_id = ?`, [idSala]);
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

    return {
        ...entry[0],
        photos,
        comments,
        reservations,
    };
};

export default selectSalaByIdService;
