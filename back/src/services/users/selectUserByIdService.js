
import getPool from "../../database/getPool.js";

// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id dado.
const selectUserByIdService = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, createdAt FROM usuarios WHERE id = ?`,
        [userId]
    );


    return users[0];
};

export default selectUserByIdService;
