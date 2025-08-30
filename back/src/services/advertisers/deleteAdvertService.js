import getPool from '../../database/getPool.js';

const deleteAdvertService = async (idAdvert) => {
    const pool = await getPool();

    try {
        // Eliminar eliminar el anuncio
        await pool.query(`DELETE FROM ad_classifieds WHERE id = ?`, [idAdvert]);
    } catch (error) {
        console.error('Error al eliminar la notice:', error);
        throw error;
    }
};

export default deleteAdvertService;
