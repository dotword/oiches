import getPool from '../../database/getPool.js';

const listMyOwnNoticesService = async (userId) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        `
            SELECT noticeboard.* 
            FROM noticeboard WHERE noticeboard.usuario_id = ?
        `,
        [userId]
    );
    return rows;
};

export default listMyOwnNoticesService;
