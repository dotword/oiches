import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const resetAdvertClicksService = async (idAdvert) => {
    const pool = await getPool();

    if (!idAdvert) throw generateErrorsUtil('No existe este anuncio', 404);

    try {
        await pool.query(
            `DELETE FROM ad_classified_clicks WHERE classified_id = ?`,
            [idAdvert]
        );
        await pool.query(
            `DELETE FROM ad_classified_stats WHERE classified_id = ?`,
            [idAdvert]
        );
    } catch (error) {
        console.error('Error al resetear las estadísticas: ', error);
        throw error;
    }
};

export default resetAdvertClicksService;
