import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const grupoExistsService = async (idGrupo) => {
    const pool = await getPool();

    const [grupo] = await pool.query(
        `
            SELECT id FROM grupos WHERE id=?
        `,
        [idGrupo]
    );

    if (!grupo.length) {
        throw generateErrorsUtil('Grupo no encontrado', 400);
    }
};

export default grupoExistsService;
