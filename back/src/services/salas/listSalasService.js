import getPool from '../../database/getPool.js';

export async function listSalasService(filters, sort) {
    const pool = await getPool();

    let query = `
   SELECT 
        Salas.id, 
        Salas.usuario_id, 
        Salas.nombre, 
        Salas.createdAt,
        (SELECT provincia FROM provincias WHERE provincias.id = Salas.provincia) AS Provincia,
        (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = Salas.generos) AS Genero,
        (SELECT name FROM Sala_fotos WHERE Sala_fotos.salaId = Salas.id LIMIT 1) AS primera_foto,
        (SELECT AVG(voto) FROM votos_salas WHERE votos_salas.salaVotada = Salas.id) AS media_votos

    FROM 
        Salas 
    LEFT JOIN generos_musicales ON generos_musicales.id = Salas.generos
    LEFT JOIN provincias ON provincias.id = Salas.provincia        
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
        query += ' AND Salas.generos = ?';
        queryParams.push(filters.genero);
    }

    if (filters.provincia) {
        query += ' AND Salas.provincia = ?';
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
