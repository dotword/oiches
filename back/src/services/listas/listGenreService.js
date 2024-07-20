import getPool from '../../database/getPool.js';

const listGenreService = async () => {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id FROM Generos_musicales');
    return rows;
};

export default listGenreService;
