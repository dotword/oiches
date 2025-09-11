import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const publishAdvertService = async (
    idAdvert,
    newExpiresAt,
    publishedAt,
    status
) => {
    const pool = await getPool();

    const [rows] = await pool.query(
        'SELECT id, status, expiresAt FROM ad_classifieds WHERE id = ?',
        [idAdvert]
    );

    if (!rows || rows.length === 0)
        throw generateErrorsUtil('Anuncio no encontrado', 404);

    const advert = rows[0];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentExpires = advert.expiresAt ? new Date(advert.expiresAt) : null;
    if (currentExpires) currentExpires.setHours(0, 0, 0, 0);

    const [result] = await pool.query(
        'UPDATE ad_classifieds SET status = ?, expiresAt = ?, publishedAt = ? WHERE id = ?',
        [status, newExpiresAt, publishedAt, idAdvert]
    );

    return {
        message: 'anuncio actualizado',
        affectedRows: result.affectedRows,
    };
};

export default publishAdvertService;
