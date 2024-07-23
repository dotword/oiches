import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const userExistsService = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(`SELECT id FROM usuarios WHERE id = ?`, [
        userId,
    ]);

    // Lanzamos un error si el usuario no existe.
    if (users.length < 1) throw generateErrorsUtil('El usuario no existe', 404);
};

export default userExistsService;
