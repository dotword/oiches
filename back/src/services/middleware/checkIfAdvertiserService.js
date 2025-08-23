import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const checkIfAdvertiserService = async (userId) => {
    const pool = await getPool();

    const [userResults] = await pool.query(
        'SELECT roles FROM usuarios WHERE id = ?',
        [userId]
    );

    if (userResults[0].roles === 'admin') {
        return;
    }

    if (userResults.length === 0 || userResults[0].roles !== 'anunciante') {
        throw generateErrorsUtil(
            'Acceso denegado. No es un usuario de tipo anunciante',
            409
        );
    }
};

export default checkIfAdvertiserService;
