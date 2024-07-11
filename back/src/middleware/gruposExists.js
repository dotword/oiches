import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

const grupoExists = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Obtenemos el id del grupo de los path params.
        const { idGrupo } = req.params;

        const [grupo] = await pool.query(
            `
                SELECT id FROM grupos WHERE id=?
            `,
            [idGrupo]
        );

        if (!grupo.length) {
            throw generateErrorsUtil('Grupo no encontrado', 400);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default grupoExists;
