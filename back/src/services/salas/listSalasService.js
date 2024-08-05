import getPool from '../../database/getPool.js';

export async function listSalasService(filters) {
    const pool = await getPool();
    console.log(filters);

    let query = `
    SELECT 
        Salas.id, 
        Salas.usuario_id, 
        Salas.nombre, 
        Salas.createdAt,
        (SELECT provincia FROM provincias WHERE provincias.id = Salas.provincia) AS Provincia,
        (SELECT name FROM Sala_fotos WHERE Sala_fotos.salaId = Salas.id LIMIT 1) AS primera_foto,
        (SELECT AVG(voto) FROM votos_salas WHERE votos_salas.salaVotada = Salas.id) AS media_votos,
        (SELECT GROUP_CONCAT(generoId) FROM generos_salas WHERE generos_salas.SalaId = Salas.id) AS generos,
        GROUP_CONCAT(gm.nombre SEPARATOR ', ') AS generoNombres
    FROM 
        Salas 
    LEFT JOIN provincias ON provincias.id = Salas.provincia
    JOIN generos_salas gs ON gs.salaId = Salas.id
    JOIN generos_musicales gm ON gs.generoId = gm.id        
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
        query += ' AND gs.generoId = ?';
        queryParams.push(filters.genero);
    }

    if (filters.provincia) {
        query += ' AND Salas.provincia = ?';
        queryParams.push(filters.provincia);
    }

    query +=
        ' GROUP BY Salas.id, Salas.nombre, Salas.usuario_id, provincias.provincia';

    // Ordenamiento por media de votos siempre

    if (filters.order && filters.field) {
        const orderField =
            filters.field === 'media_votos' ? 'media_votos' : 'Salas.nombre'; // Example of filtersing fields
        const orderDirection =
            filters.order && filters.order.toUpperCase() === 'ASC'
                ? 'ASC'
                : 'DESC';
        query += ` ORDER BY ${orderField} ${orderDirection}`;
    } else {
        // Default order by media votes descending
        query += ' ORDER BY media_votos DESC';
    }

    const [rows] = await pool.query(query, queryParams);

    return rows;
}
