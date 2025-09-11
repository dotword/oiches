import getPool from '../../database/getPool.js';

const getAdvertClicksService = async (classifiedId) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT clicks FROM ad_classified_stats WHERE classified_id = ?',
        [classifiedId]
    );
    return rows[0] ? rows[0].clicks : 0;
};

export default getAdvertClicksService;
