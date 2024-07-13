import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

const hasOneGroup = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Obtenemos el id del grupo de los path params.
        const userId = req.user.id;

        const [grupo] = await pool.query(
            `
                SELECT id FROM grupos WHERE usuario_id=?
            `,
            [userId]
        );

        if (grupo.length)
            throw generateErrorsUtil('No puedes crear más de un grupo.', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default hasOneGroup;
