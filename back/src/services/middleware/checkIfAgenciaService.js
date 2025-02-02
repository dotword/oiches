import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const checkAgenciaService = async (userId) => {
    const pool = await getPool();

    const [userResults] = await pool.query(
        'SELECT roles FROM usuarios WHERE id = ?',
        [userId]
    );

    if (userResults[0].roles === 'admin') {
        return;
    }

    if (userResults.length === 0 || userResults[0].roles !== 'agencia') {
        throw generateErrorsUtil(
            'Acceso denegado. No es un usuario de tipo agencia',
            409
        );
    }
};

export default checkAgenciaService;
