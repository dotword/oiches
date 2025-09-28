import getPool from '../../database/getPool.js';

const editAdvertPosterService = async (poster, idAdvert) => {
    const pool = await getPool();

    await pool.query(`UPDATE ad_classifieds SET image_url = ? WHERE id = ?`, [
        poster,
        idAdvert,
    ]);
};

export default editAdvertPosterService;
