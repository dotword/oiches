import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id dado.
const selectUserByIdService = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, roles, createdAt FROM usuarios WHERE id = ?`,
        [userId]
    );

    if (users.length < 1) throw generateErrorsUtil('El usuario no existe', 404);

    return users;
};

export default selectUserByIdService;
