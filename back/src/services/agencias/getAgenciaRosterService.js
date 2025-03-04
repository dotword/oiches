import getPool from '../../database/getPool.js';

const getAgenciaRosterService = async ({ userId, filters }) => {
    const pool = await getPool();

    let query = `
        SELECT id, nombre, provincia, honorarios, biografia, usuario_id, published, createdAt
        FROM grupos
        WHERE usuario_id = ?`;

    const queryParams = [userId];

    if (filters.name && filters.name.trim() !== '') {
        query += ' AND (grupos.nombre LIKE ?)';
        queryParams.push(`%${filters.name}%`);
    }

    const orderField = ['createdAt'].includes(filters.orderField)
        ? filters.orderField
        : 'createdAt';
    const orderDirection =
        filters.order && filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${orderField} ${orderDirection}`;

    const [grupos] = await pool.query(query, queryParams);

    return grupos;
};

export default getAgenciaRosterService;
