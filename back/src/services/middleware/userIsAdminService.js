import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const userIsAdminService = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, roles FROM usuarios WHERE id = ?`,
        [userId]
    );

    // Lanzamos un error si el usuario no es administrador.
    if (users[0].roles !== 'admin')
        throw generateErrorsUtil('El usuario no es administrador', 404);
};

export default userIsAdminService;
