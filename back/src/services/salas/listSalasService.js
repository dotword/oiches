import getPool from '../../database/getPool.js';

export async function listSalasService(filters, sort) {
    const pool = await getPool();

    let query = `
    SELECT 
        Salas.id, 
        Salas.usuario_id, 
        Salas.nombre, 
        Salas.provincia, 
        Salas.createdAt,
        (SELECT name FROM Sala_fotos WHERE Sala_fotos.salaId = Salas.id LIMIT 1) AS primera_foto,
        (SELECT AVG(value) FROM votos_salas WHERE votos_salas.sala_id = Salas.id) AS media_votos
    FROM 
        Salas 
    WHERE 
        1=1`;
    const queryParams = [];

    // Filtros específicos
    if (filters.nombre) {
        query += ' AND Salas.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }
    if (filters.provincia) {
        query += ' AND Salas.provincia = ?';
        queryParams.push(filters.provincia);
    }
    if (filters.direccion) {
        query += ' AND Salas.direccion = ?';
        queryParams.push(filters.direccion);
    }

    // Ordenamiento
    if (sort && sort.field && sort.order) {
        query += ` ORDER BY ${sort.field} ${sort.order}`;
    }

    const [rows] = await pool.query(query, queryParams);
    return rows;
}
