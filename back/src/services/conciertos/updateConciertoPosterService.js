import getPool from '../../database/getPool.js';

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateConciertoPosterService = async (posterName, conciertoId) => {
    const pool = await getPool();

    await pool.query(`UPDATE conciertos SET poster = ? WHERE id = ?`, [
        posterName,
        conciertoId,
    ]);
};

export default updateConciertoPosterService;
