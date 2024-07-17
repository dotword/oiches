import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

const checkIfSala = async (req, res, next) => {
    try {
        const pool = await getPool();

        const [userResults] = await pool.query(
            'SELECT roles FROM Usuarios WHERE id = ?',
            [req.user.id]
        );

        if (userResults.length === 0 || userResults[0].roles !== 'sala') {
            throw generateErrorsUtil(
                'Acceso denegado. No es un usuario de tipo sala',
                409
            );
        }

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default checkIfSala;
