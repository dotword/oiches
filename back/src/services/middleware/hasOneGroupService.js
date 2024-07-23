import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const hasOneGroupService = async (userId) => {
    const pool = await getPool();

    const [grupo] = await pool.query(
        `
            SELECT id FROM grupos WHERE usuario_id=?
        `,
        [userId]
    );

    if (grupo.length)
        throw generateErrorsUtil('No puedes crear más de un grupo.', 400);
};

export default hasOneGroupService;
