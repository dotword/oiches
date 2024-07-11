import getPool from "../../database/getPool.js";

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateUserAvatarService = async (avatarName, userId) => {
    const pool = await getPool();

    await pool.query(`UPDATE usuarios SET avatar = ? WHERE id = ?`, [
        avatarName,
        userId,
    ]);
};

export default updateUserAvatarService;