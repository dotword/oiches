import getPool from '../../database/getPool.js';

const borrarConciertoService = async (conciertoId) => {
    try {
        const pool = await getPool();

        await pool.query('DELETE FROM conciertos WHERE id = ?', [conciertoId]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default borrarConciertoService;
