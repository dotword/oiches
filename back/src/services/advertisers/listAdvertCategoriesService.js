import getPool from '../../database/getPool.js';

const listAdvertCategoriesService = async () => {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT id, name, description FROM ad_categories'
    );
    return rows;
};

export default listAdvertCategoriesService;
