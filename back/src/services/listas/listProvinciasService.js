import getPool from '../../database/getPool.js';

const listProvinciasService = async () => {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, provincia FROM provincias');
    return rows;
};

export default listProvinciasService;
