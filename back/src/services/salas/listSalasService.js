import getPool from '../../database/getPool.js';

export async function listSalasService(filters, sort) {
    const pool = await getPool();

    let query = `
   SELECT 
        Salas.id, 
        Salas.usuario_id, 
        Salas.nombre, 
        Salas.createdAt,
        GM.nombre AS genero,
        P.provincia AS provincia,
        (SELECT name FROM Sala_fotos WHERE Sala_fotos.salaId = Salas.id LIMIT 1) AS primera_foto,
        (SELECT AVG(value) FROM votos_salas WHERE votos_salas.sala_id = Salas.id) AS media_votos

    FROM 
        Salas 
    LEFT JOIN generos_salas GS ON GS.salaId = Salas.id
    LEFT JOIN generos_musicales GM ON GM.id = GS.generoId
    LEFT JOIN provincias_salas PS ON PS.salaId = Salas.id
    LEFT JOIN provincias P ON P.id = PS.provinciaId 
    WHERE 
        1=1
        `;
    const queryParams = [];

    // Filtros específicos
    if (filters.nombre) {
        query += ' AND Salas.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    if (filters.genero) {
        query += ' AND GM.nombre = ?';
        queryParams.push(filters.genero);
    }

    if (filters.provincia) {
        query += ' AND P.provincia = ?';
        queryParams.push(filters.provincia);
    }

    // Ordenamiento
    if (sort && sort.field && sort.order) {
        query += ` ORDER BY ${sort.field} ${sort.order}`;
    }

    const [rows] = await pool.query(query, queryParams);

    if (rows.length === 0) {
        return 'No se encontró ninguna sala';
    }

    return rows;
}
