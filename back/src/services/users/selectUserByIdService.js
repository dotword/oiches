import getPool from '../../database/getPool.js';

// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id dado.
const selectUserByIdService = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, roles, createdAt FROM usuarios WHERE id = ?`,
        [userId]
    );

    // Comprobamos los grupos del usuarios
    // const [grupos] = await pool.query(
    //     `SELECT id, nombre FROM grupos WHERE usuario_id = ?`,
    //     [userId]
    // );
    // // Agregamos el array de los media del grupo.
    // users[0].grupos = grupos;

    // // Comprobamos las salas del usuarios
    // const [salas] = await pool.query(
    //     `SELECT id, nombre FROM salas WHERE usuario_id = ?`,
    //     [userId]
    // );
    // // Agregamos el array de los media del grupo.
    // users[0].salas = salas;

    return users;
};

export default selectUserByIdService;
