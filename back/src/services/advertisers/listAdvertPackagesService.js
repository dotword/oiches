import getPool from '../../database/getPool.js';

const listAdvertPackagesService = async () => {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, package FROM ad_packages');
    return rows;
};

export default listAdvertPackagesService;
