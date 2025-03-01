import getPool from '../../database/getPool.js';

const listCategoriesNoticeService = async () => {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT id, nombre, role, parent_id FROM category_noticeboard'
    );
    return rows;
};

export default listCategoriesNoticeService;
