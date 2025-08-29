import getPool from '../../database/getPool.js';

const listMyOwnAdvertsService = async (userId) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        `
            SELECT ad_classifieds.* 
            FROM ad_classifieds WHERE ad_classifieds.user_id = ?
        `,
        [userId]
    );
    return rows;
};

export default listMyOwnAdvertsService;
