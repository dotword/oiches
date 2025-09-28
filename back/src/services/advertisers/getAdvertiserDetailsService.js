import getPool from '../../database/getPool.js';

const getAdvertiserDetailsService = async (userId) => {
    const pool = await getPool();

    const [advertiserDetails] = await pool.query(
        `
          SELECT * FROM advertiser_profiles WHERE user_id = ?
        `,
        [userId]
    );

    if (advertiserDetails.length === 0) {
        return null;
    }

    return advertiserDetails;
};

export default getAdvertiserDetailsService;
