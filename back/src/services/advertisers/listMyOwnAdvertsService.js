import getPool from '../../database/getPool.js';

const listMyOwnAdvertsService = async (userId) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        `
            SELECT ad_classifieds.*,
            COALESCE((
                SELECT SUM(s2.clicks)
                FROM ad_classified_stats s2
                WHERE s2.classified_id = ad_classifieds.id
            ), 0) AS clicks 
            FROM ad_classifieds WHERE ad_classifieds.user_id = ?
        `,
        [userId]
    );
    return rows;
};

export default listMyOwnAdvertsService;
