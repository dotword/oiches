import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const updateUserService = async (userId, email) => {
    const pool = await getPool();

    // Comprobar que el email no esté registrado
    let [users] = await pool.query(` SELECT id FROM usuarios WHERE email=?`, [
        email,
    ]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0)
        throw generateErrorsUtil('El email ya está registrado', 409);

    await pool.query(
        `
            UPDATE usuarios
            SET email = ?
            WHERE id = ?
        `,
        [email, userId]
    );
};

export default updateUserService;
