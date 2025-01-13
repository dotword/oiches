import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const concertExistsService = async (conciertoId) => {
    const pool = await getPool();

    const [concert] = await pool.query(
        `
            SELECT id FROM conciertos WHERE id=?
        `,
        [conciertoId]
    );

    if (!concert.length) {
        throw generateErrorsUtil('Concierto no encontrado', 400);
    }
};

export default concertExistsService;
