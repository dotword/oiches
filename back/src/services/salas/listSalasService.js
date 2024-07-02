import getPool from '../../database/getPool.js';

export async function listSalasService(filters, sort) {
    const pool = await getPool();

    let query = 'SELECT * FROM salas WHERE 1=1';
    const queryParams = [];

    if (filters.name) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${filters.name}%`);
    }

    if (filters.capacity) {
        query += ' AND capacity >= ?';
        queryParams.push(filters.capacity);
    }

    if (sort && sort.field && sort.order) {
        query += ` ORDER BY ${sort.field} ${sort.order}`;
    }

    const [rows] = await pool.query(query, queryParams);
    return rows;
}
