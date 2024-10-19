import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const pool = await getPool();

        const [users] = await pool.query(
            `SELECT roles FROM usuarios WHERE id = ?`,
            [req.user.id]
        );

        if (req.user.id !== userId && users[0].roles !== 'admin')
            throw generateErrorsUtil(
                'El usuario no está autorizado para hacer esta operación',
                409
            );

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditUser;
