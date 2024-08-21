import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const checkIfSalaService = async (userId) => {
    const pool = await getPool();

    const [userResults] = await pool.query(
        'SELECT roles FROM usuarios WHERE id = ?',
        [userId]
    );

    if (userResults.length === 0 || userResults[0].roles !== 'sala') {
        throw generateErrorsUtil(
            'Acceso denegado. No es un usuario de tipo sala',
            409
        );
    }
};

export default checkIfSalaService;
