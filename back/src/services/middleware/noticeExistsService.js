import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const noticeExistsService = async (idNotice) => {
    const pool = await getPool();

    const [notice] = await pool.query(
        `
            SELECT id FROM noticeboard WHERE id=?
        `,
        [idNotice]
    );

    if (!notice.length) {
        throw generateErrorsUtil('Anuncio no encontrado', 400);
    }
};

export default noticeExistsService;
