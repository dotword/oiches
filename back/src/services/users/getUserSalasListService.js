import getPool from '../../database/getPool.js';

// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id dado.
const getUserSalasListService = async (userId) => {
    const pool = await getPool();
    console.log(userId);
    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(
        `SELECT id, nombre, provincia FROM salas WHERE usuario_id = ?`,
        [userId]
    );

    return users;
};

export default getUserSalasListService;
