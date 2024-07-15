import getPool from '../../database/getPool.js';

export async function listGruposService(filters, sort) {
    const pool = await getPool();

    let query = `
        SELECT g.*, p.provincia AS provincia_nombre, gm.nombre AS genero_nombre 
        FROM grupos g
        JOIN provincias p ON g.provincia = p.id
        JOIN generos_musicales gm ON g.generos = gm.id
        WHERE 1=1
    `;
    const queryParams = [];

    if (filters.nombre) {
        query += ' AND g.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    if (filters.provincia) {
        query += ' AND p.provincia LIKE ?';
        queryParams.push(`%${filters.provincia}%`);
    }

    if (filters.generos) {
        query += ' AND gm.nombre LIKE ?';
        queryParams.push(`%${filters.generos}%`);
    }

    if (filters.honorarios) {
        query += ' AND g.honorarios >= ?';
        queryParams.push(filters.honorarios);
    }

    if (sort && sort.field && sort.order) {
        query += ` ORDER BY ${sort.field} ${sort.order}`;
    }

    const [rows] = await pool.query(query, queryParams);
    return rows;
}
